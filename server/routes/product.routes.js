const Router = require("express");
const router = new Router();
const productController = require("../controllers/product.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.post("/", productController.create);
router.delete("/:id", productController.delete);
router.patch("/:id", productController.edit);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

module.exports = router;
