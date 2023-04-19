const { ProductImg } = require('../models/models');
const ApiError = require('../error/ApiError');
const { convertAndSavePic, removePic } = require('../utils/saveAndRemovePic');
const uuid = require('uuid');
const pictureService = require('../services/picture.service');

class PictureController {
  async create(req, res, next) {
    try {
      const { productId, index } = req.params;
      if (!req.files) {
        return next(ApiError.badRequest('Не отправили фото'));
      }
      const images = [req.files.img].flat();

      await pictureService.createPicture(productId, index, images);
      return res.json('Image created');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.files) {
        return next(ApiError.badRequest('Не отправили фото'));
      }
      const { img } = req.files;
      await pictureService.editPicture(id, img);

      return res.json('Image updated');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await pictureService.deletePicture(id);
      return res.json('Image deleted');
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new PictureController();
