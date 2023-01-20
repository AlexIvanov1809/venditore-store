const ApiError = require("../exceptions/api.error");
const itemTypesService = require("../services/itemTypes.service");

class ItemTypesController {
  async getItems(req, res, next) {
    try {
      const type = req.params.type;
      const list = await itemTypesService.fetchAllItems(type);

      return res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async createItem(req, res, next) {
    try {
      const type = req.params.type;
      const body = req.body;
      const newItem = await itemTypesService.createItem(type, body);

      return res.status(201).send(newItem);
    } catch (e) {
      next(e);
    }
  }

  async removeItem(req, res, next) {
    try {
      const type = req.params.type;
      const id = req.params.itemId;
      const removedItem = await itemTypesService.removeItem(type, id);

      return res.send(removedItem);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ItemTypesController();
