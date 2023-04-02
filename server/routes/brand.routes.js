const Router = require("express");
const router = new Router();
const brandController = require("../controllers/picture.controller");
const checkRole = require("../middleware/CheckRole.middleware");

router.post("/", checkRole("ADMIN"), brandController.create);
router.patch("/:id", checkRole("ADMIN"), brandController.update);
router.delete("/:id", checkRole("ADMIN"), brandController.delete);
router.get("/", brandController.getAll);

module.exports = router;
