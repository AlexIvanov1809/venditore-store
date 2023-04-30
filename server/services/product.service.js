const { Product, ProductImg, ProductPrice } = require('../models/models');
const uuid = require('uuid');
const nullConverterForIdFields = require('../utils/nullConverterForIdFields');
const makeEntitiesForFilters = require('../utils/makeEntitiesForFilters');
const { INCLUDES_MODELS } = require('../constants/consts');
const { convertAndSavePic, removePic } = require('../utils/saveAndRemovePic');
const sequelize = require('../db');
const { getFullName, getMinPriceValue } = require('../utils/getFullName');

class ProductService {
  async createProduct({ prices, ...data }, images) {
    data.fullName = await getFullName(data);
    data.minPriceValue = getMinPriceValue(prices);

    const product = await Product.create({
      ...data,
    });

    await makeEntitiesForFilters(product);

    const priceArr = JSON.parse(prices);
    priceArr.forEach(
      async (priceItem) =>
        await ProductPrice.create({
          weight: priceItem.weight,
          value: parseInt(priceItem.value),
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
        fullName: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('fullName')),
          'LIKE',
          '%' + name + '%',
        ),
        active: true,
      },
      include: INCLUDES_MODELS,
      order: [
        [{ model: ProductPrice, as: 'prices' }, 'value', 'ASC'],
        [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
      ],
    });
  }

  async getAllProducts(limit, page, sortBy, filterParams) {
    const offset = page * limit - limit;
    const sortProductByPrice = sortBy
      ? ['minPriceValue', sortBy]
      : ['id', 'ASC'];

    if (!Object.keys(filterParams).length) {
      return await Product.findAndCountAll({
        include: INCLUDES_MODELS,
        order: [
          [{ model: ProductPrice, as: 'prices' }, 'id', 'ASC'],
          [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
        ],
        distinct: true,
      });
    }
    return await Product.findAndCountAll({
      where: { ...filterParams, active: true },
      limit,
      offset,
      include: INCLUDES_MODELS,
      order: [
        sortProductByPrice,
        [{ model: ProductPrice, as: 'prices' }, 'value', 'ASC'],
        [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
      ],
      distinct: true,
    });
  }

  async getOneProduct(id) {
    return await Product.findOne({
      where: { id },
      include: INCLUDES_MODELS,
      order: [
        [{ model: ProductPrice, as: 'prices' }, 'id', 'ASC'],
        [{ model: ProductImg, as: 'images' }, 'row', 'ASC'],
      ],
    });
  }

  async editProduct(id, data) {
    data.fullName = await getFullName(data);
    data.minPriceValue = getMinPriceValue(data.prices);

    const preparedData = nullConverterForIdFields(data);
    await Product.update(preparedData, { where: { id } });
    const product = await Product.findOne({ where: { id } });

    await makeEntitiesForFilters(product);

    const prices = JSON.parse(data.prices);
    prices.forEach(async (price) =>
      price.productId
        ? await ProductPrice.update(
            {
              weight: price.weight,
              value: parseInt(price.value),
            },
            { where: { id: price.id } },
          )
        : await ProductPrice.create({
            weight: price.weight,
            value: parseInt(price.value),
            productId: id,
          }),
    );
  }

  async deleteProduct(id) {
    const images = await ProductImg.findAll({ where: { productId: id } });

    images.forEach(async (image) => {
      await removePic(image.name);
    });

    await makeEntitiesForFilters(id);
    await Promise.all([
      ProductImg.destroy({ where: { productId: id } }),
      ProductPrice.destroy({ where: { productId: id } }),
      Product.destroy({ where: { id } }),
    ]);
  }
}

module.exports = new ProductService();
