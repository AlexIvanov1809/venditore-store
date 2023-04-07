const Router = require("express");
const router = new Router();
const pictureController = require("../controllers/picture.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.post("/:productId/:index", pictureController.create);
router.patch("/:id", pictureController.update);
router.delete("/:id", pictureController.delete);

module.exports = router;
