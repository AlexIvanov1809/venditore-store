const express = require("express");
const Method = require("../../models/coffeeItems/Method");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Method.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newMethod = await Method.create({
        ...req.body,
      });
      res.status(201).send(newMethod);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:methodId", async (req, res) => {
  try {
    const { methodId } = req.params;
    const removedMethod = await Method.findById(methodId);

    await removedMethod.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
