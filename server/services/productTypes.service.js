const itemTypesModels = require('../models/models');

class ProductTypesService {
  async createType(type, name) {
    return await itemTypesModels[type].create({ name });
  }

  async getAllTypes(type) {
    return await itemTypesModels[type].findAll();
  }

  async getAllForFilterTypes(type, typeId) {
    if (type !== 'Type') {
      const key = 'Type' + type;
      const brand = await itemTypesModels[key].findAll({
        where: { typeId },
      });

      const id = [];
      brand.forEach((i) => {
        const entityId = type.charAt(0).toLowerCase() + type.substring(1);
        id.push(i[entityId + 'Id']);
      });
      return await itemTypesModels[type].findAll({
        where: { id },
      });
    }
    return await itemTypesModels.Type.findAll();
  }

  async editTypes(id, type, name) {
    return await itemTypesModels[type].update({ name }, { where: { id } });
  }

  async deleteType(id, type) {
    return await itemTypesModels[type].destroy({ where: { id } });
  }
}

module.exports = new ProductTypesService();
