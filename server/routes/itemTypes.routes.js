const express = require("express");
const router = express.Router({ mergeParams: true });
const itemTypesController = require("../controllers/ItemTypesController.controller");

router.get("/:type", itemTypesController.getItems);
router.post("/:type", itemTypesController.createItem);
router.delete("/:type/:itemId", itemTypesController.removeItem);

module.exports = router;
