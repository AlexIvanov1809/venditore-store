const { Product, ProductImg, ProductPrice } = require('../models/models');
const uuid = require('uuid');
const nullConverterForIdFields = require('../utils/nullConverterForIdFields');
const makeEntitiesForFilters = require('../utils/makeEntitiesForFilters');
const { INCLUDES_MODELS } = require('../constants/consts');
const { convertAndSavePic } = require('../utils/saveAndRemovePic');
const sequelize = require('../db');
const { getFullName, getMinPriceValue } = require('../utils/getFullName');

class ProductService {
  async createProduct({ price, ...data }, images) {
    data.fullName = await getFullName(data);
    data.minPriceValue = getMinPriceValue(price);

    const product = await Product.create({
      ...data,
    });

    makeEntitiesForFilters(product);

    const priceArr = JSON.parse(price);
    priceArr.forEach(
      async (priceItem) =>
        await ProductPrice.create({
          weight: priceItem.weight,
          value: priceItem.value,
          productId: product.id,
        }),
    );

    images.map(async (image, index) => {
      let fileName = uuid.v4() + '.jpg';
      await convertAndSavePic(image, fileName);

      await ProductImg.create({
        name: fileName,
        productId: product.id,
        row: index,
      });
    });

    return product;
  }

  async searchProduct(name) {
    return await Product.findAll({
      where: {
        sortName: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('sortName')),
          'LIKE',
          '%' + name + '%',
        ),
      },
      include: INCLUDES_MODELS,
      order: [
        [{ model: ProductPrice, as: 'prices' }, 'value', 'ASC'],
        [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
      ],
    });
  }

  async getAllProducts(limit, page, filterParams) {
    const offset = page * limit - limit;

    if (!Object.keys(filterParams).length) {
      return await Product.findAndCountAll({
        include: INCLUDES_MODELS,
        order: [
          [{ model: ProductPrice, as: 'prices' }, 'value', 'ASC'],
          [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
        ],
        distinct: true,
      });
    }
    if (Object.keys(filterParams).length) {
      return await Product.findAndCountAll({
        where: { ...filterParams, active: true },
        limit,
        offset,
        include: INCLUDES_MODELS,
        order: [
          [{ model: ProductPrice, as: 'prices' }, 'value', 'ASC'],
          [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
        ],
        distinct: true,
      });
    }
  }

  async getOneProduct(id) {
    return await Product.findOne({
      where: { id },
      include: INCLUDES_MODELS,
      order: [
        [{ model: ProductPrice, as: 'prices' }, 'value', 'ASC'],
        [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
      ],
    });
  }

  async editProduct(id, data) {
    data.fullName = await getFullName(data);
    data.minPriceValue = getMinPriceValue(data.price);

    const preparedData = nullConverterForIdFields(data);
    await Product.update(preparedData, { where: { id } });
    const product = await Product.findOne({ where: { id } });

    makeEntitiesForFilters(product);

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

  async deleteProduct(id) {
    const img = await ProductImg.findAll({ where: { productId: id } });

    img.forEach(async (i) => {
      await removePic(i.name);
    });

    makeEntitiesForFilters(id);
    await ProductImg.destroy({ where: { productId: id } });
    await ProductPrice.destroy({ where: { productId: id } });
    await Product.destroy({ where: { id } });
  }
}

module.exports = new ProductService();
