const { TYPES_FOR_FILTER } = require('../constants/consts');

function makeEntitiesForFilters(product) {
  TYPES_FOR_FILTER.forEach(async (type) => {
    try {
      if (typeof product === 'string') {
        await type.model.destroy({
          where: {
            productId: product,
          },
        });
        return;
      }

      const checker = await type.model.findAll({
        where: { productId: product.id },
      });

      if (checker.length) {
        await type.model.destroy({
          where: {
            productId: product.id,
          },
        });
      }

      if (product[type.colName]) {
        await type.model.create({
          typeId: product.typeId,
          [type.colName]: product[type.colName],
          productId: product.id,
        });
      }
    } catch (error) {
      throw error;
    }
  });
}

module.exports = makeEntitiesForFilters;
