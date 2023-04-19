const { ProductImg } = require('../models/models');
const uuid = require('uuid');
const { convertAndSavePic, removePic } = require('../utils/saveAndRemovePic');

class PictureService {
  async createPicture(productId, index, images) {
    const data = images.map(async (image) => {
      let fileName = uuid.v4() + '.jpg';
      await convertAndSavePic(image, fileName);

      await ProductImg.create({
        name: fileName,
        productId,
        row: parseInt(index),
      });
    });
  }

  async editPicture(id, image) {
    const img = await ProductImg.findOne({ where: { id } });

    let fileName = uuid.v4() + '.jpg';
    await convertAndSavePic(image, fileName);
    await removePic(img.name);

    await ProductImg.update(
      {
        name: fileName,
      },
      { where: { id: img.id } },
    );
  }

  async deletePicture(id) {
    const image = await ProductImg.findOne({ where: { id } });
    await removePic(image.name);
    await ProductImg.destroy({ where: { id } });
  }
}

module.exports = new PictureService();
