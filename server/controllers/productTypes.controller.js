const itemTypesModels = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductTypesController {
  async create(req, res, next) {
    try {
      const { type } = req.params;
      const { name } = req.body;
      const data = await itemTypesModels[type].create({ name });
      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { type } = req.params;
      const data = await itemTypesModels[type].findAll();
      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAllForFilter(req, res, next) {
    try {
      const { type, typeId } = req.params;
      let data;
      if (type !== "Type") {
        const key = "Type" + type;
        const brand = await itemTypesModels[key].findAll({
          where: { typeId },
        });

        const id = [];
        brand.forEach((i) => {
          const entityId = type.charAt(0).toLowerCase() + type.substr(1);
          id.push(i[entityId + "Id"]);
        });
        data = await itemTypesModels[type].findAll({
          where: { id },
        });
      } else {
        data = await itemTypesModels.Type.findAll();
      }
      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, type } = req.params;
      const { name } = req.body;
      const data = await itemTypesModels[type].update(
        { name },
        { where: { id } },
      );

      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id, type } = req.params;
      const data = await itemTypesModels[type].destroy({ where: { id } });
      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ProductTypesController();
