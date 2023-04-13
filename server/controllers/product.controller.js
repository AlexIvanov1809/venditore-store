const { Product, ProductImg, ProductPrice } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const { INCLUDES_MODELS } = require('../constants/consts');
const makeEntitiesForFilters = require('../utils/makeEntitiesForFilters');
const { convertAndSavePic, removePic } = require('../utils/saveAndRemovePic');
const nullConverterForIdFields = require('../utils/nullConverterForIdFields');

class ProductController {
  // async test(req, res, next) {
  //   try {
  //     let a;
  //     const prod = await Product.findOrBuild().then((data) => (a = data));
  //     res.json(a);
  //     return;
  //   } catch (e) {
  //     next(ApiError.internal(e.message));
  //   }
  // }
  async create(req, res, next) {
    try {
      let { price, ...data } = req.body;
      if (!req.files) {
        next(ApiError.badRequest('Не отправили фото'));
      }
      let { img } = req.files;

      const product = await Product.create({
        ...data,
      });

      makeEntitiesForFilters(product);

      if (price) {
        price = JSON.parse(price);
        price.forEach(
          async (i) =>
            await ProductPrice.create({
              weight: i.weight,
              value: i.value,
              productId: product.id,
            }),
        );
      }

      Array.isArray(img) ? img : (img = [img]);
      img.forEach(async (i, index) => {
        let fileName = uuid.v4() + '.jpg';
        convertAndSavePic(i, fileName);

        await ProductImg.create({
          name: fileName,
          productId: product.id,
          row: index,
        });
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page, ...data } = req.query;
      const filterParams = Object.keys(data).reduce((acc, product) => {
        if (data[product]) {
          acc[product] = data[product].split('-');
        }
        return acc;
      }, {});
      let offset = page * limit - limit;
      let products;

      if (!Object.keys(filterParams).length) {
        products = await Product.findAndCountAll({
          include: INCLUDES_MODELS,
          order: [
            [{ model: ProductPrice, as: 'price' }, 'value', 'ASC'],
            [{ model: ProductImg, as: 'image' }, 'row', 'ASC'],
          ],
          distinct: true,
        });
      }
      if (Object.keys(filterParams).length) {
        products = await Product.findAndCountAll({
          where: { ...filterParams },
          limit,
          offset,
          include: INCLUDES_MODELS,
          order: [
            [{ model: ProductPrice, as: 'price' }, 'value', 'ASC'],
            [{ model: ProductImg, as: 'image' }, 'row', 'ASC'],
          ],
          distinct: true,
        });
      }

      return res.json(products);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const products = await Product.findOne({
        where: { id },
        include: INCLUDES_MODELS,
        order: [
          [{ model: ProductPrice, as: 'price' }, 'value', 'ASC'],
          [{ model: ProductImg, as: 'image' }, 'row', 'ASC'],
        ],
      });
      return res.json(products);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      let data = req.body;

      const preparedData = nullConverterForIdFields(data);
      await Product.update(preparedData, { where: { id } });
      const product = await Product.findOne({ where: { id } });

      makeEntitiesForFilters(product);

      if (data.price) {
        const price = JSON.parse(data.price);
        price.forEach(async (i) =>
          i.productId
            ? await ProductPrice.update(
                {
                  weight: i.weight,
                  value: i.value,
                },
                { where: { id: i.id } },
              )
            : await ProductPrice.create({
                weight: i.weight,
                value: i.value,
                productId: id,
              }),
        );
      }
      return res.json(product);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const img = await ProductImg.findAll({ where: { productId: id } });

      img.forEach(async (i) => {
        await removePic(i.name);
      });

      makeEntitiesForFilters(id);
      await ProductImg.destroy({ where: { productId: id } });
      await ProductPrice.destroy({ where: { productId: id } });
      await Product.destroy({ where: { id } });
      return res.json('Product was removed');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ProductController();
