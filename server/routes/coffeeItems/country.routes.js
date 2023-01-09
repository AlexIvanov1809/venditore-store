const express = require("express");
const Country = require("../../models/coffeeItems/Country");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Country.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newCountry = await Country.create({
        ...req.body,
      });
      res.status(201).send(newCountry);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:countryId", async (req, res) => {
  try {
    const { countryId } = req.params;
    const removedCountry = await Country.findById(countryId);

    await removedCountry.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
