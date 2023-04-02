const { ItemPrice } = require("../models/models");
const ApiError = require("../error/ApiError");

class PictureController {
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await ItemPrice.destroy({ where: { id } });
      return res.json("deleted");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new PictureController();
