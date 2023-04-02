const Router = require("express");
const router = new Router();
const itemController = require("../controllers/item.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.post("/", itemController.create);
router.delete("/:id", itemController.delete);
router.patch("/:id", itemController.edit);
router.get("/", itemController.getAll);
router.get("/:id", itemController.getOne);

module.exports = router;
