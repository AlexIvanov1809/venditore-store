const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function convertAndSavePic(file, fileName) {
  await sharp(file.data)
    .toFormat("jpeg")
    .resize(200, 200)
    .jpeg({
      quality: 100,
      chromaSubsampling: "4:4:4",
    })
    .toFile(path.resolve(__dirname, "..", "static", fileName), (err) => {
      if (err) {
        res.send(err);
      }
    });
}

async function removePic(name) {
  await fs.unlink(path.resolve(__dirname, "..", "static", name), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = { convertAndSavePic, removePic };
