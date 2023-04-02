const Router = require("express");
const router = new Router();
const priceController = require("../controllers/price.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.delete("/:id", priceController.delete);

module.exports = router;
