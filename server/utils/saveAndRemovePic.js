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
  try {
    await fs.unlinkSync(path.resolve(__dirname, '..', 'static', fileName));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { convertAndSavePic, removePic };
