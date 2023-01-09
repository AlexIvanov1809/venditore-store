const express = require("express");
const Brand = require("../../models/coffeeItems/Brand");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Brand.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newBrand = await Brand.create({
        ...req.body,
      });
      res.status(201).send(newBrand);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:brandId", async (req, res) => {
  try {
    const { brandId } = req.params;
    const removedBrand = await Brand.findById(brandId);

    await removedBrand.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
