const { TYPES_FOR_FILTER } = require("../constants/consts");

function makeEntitiesForFilters(item) {
  TYPES_FOR_FILTER.forEach(async (t) => {
    if (item[t.id]) {
      const checker = await t.model.findAll({
        where: { productId: item.id },
      });
      if (checker.length !== 0) {
        await t.model.destroy({
          where: {
            productId: item.id,
          },
        });
      }

      await t.model.create({
        typeId: item.typeId,
        [t.id]: item[t.id],
        productId: item.id,
      });
    }
    if (typeof item === "string") {
      await t.model.destroy({
        where: {
          productId: item,
        },
      });
    }
  });
}

module.exports = makeEntitiesForFilters;
