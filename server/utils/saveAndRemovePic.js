const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertAndSavePic(file, fileName) {
  await sharp(file.data)
    .toFormat('jpeg')
    .resize(300, 300)
    .jpeg({
      quality: 100,
      chromaSubsampling: '4:4:4',
    })
    .toFile(path.resolve(__dirname, '..', 'static', fileName), (err) => {
      if (err) {
        throw err;
      }
    });
}

async function removePic(fileName) {
  await fs.unlink(path.resolve(__dirname, '..', 'static', fileName), (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = { convertAndSavePic, removePic };
