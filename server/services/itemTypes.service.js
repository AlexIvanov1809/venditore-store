const itemTypes = require("../models/index");

class ItemTypesService {
  async fetchAllItems(type) {
    return await itemTypes[type].find();
  }

  async createItem(type, body) {
    return await itemTypes[type].create({ ...body });
  }

  async removeItem(type, id) {
    const removedItem = await itemTypes[type].findById(id);
    await removedItem.remove();

    return null;
  }
}

module.exports = new ItemTypesService();
