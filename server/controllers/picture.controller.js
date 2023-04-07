const { ProductImg } = require("../models/models");
const ApiError = require("../error/ApiError");
const { convertAndSavePic, removePic } = require("../utils/saveAndRemovePic");
const uuid = require("uuid");

class PictureController {
  async create(req, res, next) {
    const { productId, index } = req.params;

    if (!req.files) {
      next(ApiError.badRequest("Не отправили фото"));
    }
    let { img } = req.files;
    Array.isArray(img) ? img : (img = [img]);
    img.forEach(async (i) => {
      let fileName = uuid.v4() + ".jpg";
      convertAndSavePic(i, fileName);

      await ProductImg.create({
        name: fileName,
        productId,
        row: parseInt(index),
      });
    });
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.files) {
        next(ApiError.badRequest("Не отправили фото"));
        console.log({ id });
      }
      let { img } = req.files;
      const image = await ProductImg.findOne({ where: { id } });

      let fileName = uuid.v4() + ".jpg";
      convertAndSavePic(img, fileName);
      removePic(image.name);

      await ProductImg.update(
        {
          name: fileName,
        },
        { where: { id: image.id } },
      );

      return res.json("updated");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const image = await ProductImg.findOne({ where: { id } });
      removePic(image.name);

      await ProductImg.destroy({ where: { id } });
      return res.json("deleted");
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new PictureController();
