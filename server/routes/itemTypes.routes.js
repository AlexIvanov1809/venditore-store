const Router = require("express");
const router = new Router();
const ItemTypesController = require("../controllers/itemTypes.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.post("/:type", ItemTypesController.create);
router.patch("/:type/:id", ItemTypesController.update);
router.delete("/:type/:id", ItemTypesController.delete);
router.get("/:type", ItemTypesController.getAll);
router.get("/:type/filter/:typeId", ItemTypesController.getAllForFilter);

module.exports = router;
