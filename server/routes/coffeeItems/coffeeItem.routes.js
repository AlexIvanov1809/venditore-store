const express = require("express");
const CoffeeItem = require("../../models/coffeeItems/CoffeeItem");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await CoffeeItem.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newCoffeeItem = await CoffeeItem.create({
        ...req.body,
      });
      res.status(201).send(newCoffeeItem);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.patch("/:coffeeItemId", async (req, res) => {
  try {
    const { coffeeItemId } = req.params;

    const updatedCoffeeItem = await CoffeeItem.findByIdAndUpdate(
      coffeeItemId,
      req.body,
      {
        new: true,
      }
    );
    // {new:true} мы ждем когда все обновиться, чтобы передать на фронт верные данные
    res.send(updatedCoffeeItem);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:coffeeItemId", async (req, res) => {
  try {
    const { coffeeItemId } = req.params;
    const removedCoffeeItem = await CoffeeItem.findById(coffeeItemId);

    await removedCoffeeItem.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
