const Router = require("express");
const router = new Router();
const fs = require("fs");
const sharp = require("sharp");
const Image = require("../models/Image");
// const imgDirectory = require('../assets/index')

router.post("/:key", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Файл не был загружен" });
    }
    const { key } = req.params;
    // const path = `${__dirname}/../../client/public/img/marketItems/${key}/`;
    // const path = `${imgDirectory}/img/marketItems/${key}/`;
    const path = `${__dirname}/../client/img/marketItems/${key}/`;
    const file = req.files.file;
    newFileName = Date.now() + ".jpeg";
    await sharp(file.data)
      .toFormat("jpeg")
      .resize(200, 200)
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
      })
      .toFile(path + newFileName, (err) => {
        if (err) {
          res.send(err);
        }
      });

    const newImage = await Image.create({
      name: newFileName,
      straightPath: path,
      htmlPath: `img/marketItems/${key}/${newFileName}`,
    });
    res.status(200).send(newImage);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/:key", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Файл не был загружен" });
    }
    const { key } = req.params;
    const file = req.files.file;
    const image = await Image.findById(key);
    const newFileName = Date.now() + ".jpeg";

    await fs.unlink(image.straightPath + image.name, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const path = image.htmlPath.split("/");
    path.pop();
    path.push(newFileName);

    await sharp(file.data)
      .toFormat("jpeg")
      .resize(200, 200)
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
      })
      .toFile(image.straightPath + newFileName, (err) => {
        if (err) {
          res.send(err);
        }
      });

    // file.mv(image.straightPath + newFileName);
    const updatedImage = await Image.findByIdAndUpdate(
      image._id,
      {
        name: newFileName,
        straightPath: image.straightPath,
        htmlPath: path.join("/"),
      },
      {
        new: true,
      },
    );
    res.send(updatedImage);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const removedImage = await Image.findById(fileId);
    await removedImage.remove();

    fs.unlink(removedImage.straightPath + removedImage.name, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(201).json({ message: "Файл удалён" });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
