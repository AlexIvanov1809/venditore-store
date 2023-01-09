const express = require("express");
const TeaItem = require("../../models/teaItems/TeaItem");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await TeaItem.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newTeaItem = await TeaItem.create({
        ...req.body,
      });
      res.status(201).send(newTeaItem);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.patch("/:teaItemId", async (req, res) => {
  try {
    const { teaItemId } = req.params;

    const updatedTeaItem = await TeaItem.findByIdAndUpdate(
      teaItemId,
      req.body,
      {
        new: true,
      }
    );
    // {new:true} мы ждем когда все обновиться, чтобы передать на фронт верные данные
    res.send(updatedTeaItem);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:teaItemId", async (req, res) => {
  try {
    const { teaItemId } = req.params;
    const removedTeaItem = await TeaItem.findById(teaItemId);

    await removedTeaItem.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
