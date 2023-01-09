const express = require("express");
const Kind = require("../../models/coffeeItems/Kind");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Kind.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newKind = await Kind.create({
        ...req.body,
      });
      res.status(201).send(newKind);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:kindId", async (req, res) => {
  try {
    const { kindId } = req.params;
    const removedKind = await Kind.findById(kindId);

    await removedKind.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
