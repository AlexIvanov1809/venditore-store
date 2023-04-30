const ApiError = require('../error/ApiError');
const productTypesService = require('../services/productTypes.service');

class ProductTypesController {
  async create(req, res, next) {
    try {
      const { type } = req.params;
      const { name } = req.body;
      const data = await productTypesService.createType(type, name);
      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { type } = req.params;
      const data = await productTypesService.getAllTypes(type);
      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getAllForFilter(req, res, next) {
    try {
      const { type, entityId } = req.params;
      const data = await productTypesService.getAllForFilterTypes(
        type,
        entityId,
      );

      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, type } = req.params;
      const { name } = req.body;
      const data = await productTypesService.editTypes(id, type, name);

      return res.json(data);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id, type } = req.params;
      await productTypesService.deleteType(id, type);
      return res.json('removed');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new ProductTypesController();
