const Router = require("express");
const router = new Router();

router.use("/user", require("./user.routes"));
router.use("/itemTypes", require("./itemTypes.routes"));
router.use("/product", require("./item.routes"));
router.use("/pictures", require("./picture.routes"));
router.use("/price", require("./price.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
