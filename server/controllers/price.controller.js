const { ProductPrice } = require('../models/models');
const ApiError = require('../error/ApiError');

class PictureController {
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await ProductPrice.destroy({ where: { id } });
      return res.json('Price deleted');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new PictureController();
