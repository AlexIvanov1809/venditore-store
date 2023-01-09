const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/coffeeCounties", require("./coffeeItems/country.routes"));
router.use("/coffeeBrands", require("./coffeeItems/brand.routes"));
router.use("/coffeeItems", require("./coffeeItems/coffeeItem.routes"));
router.use("/coffeeKinds", require("./coffeeItems/kind.routes"));
router.use("/coffeeMethods", require("./coffeeItems/method.routes"));
router.use("/teaBrands", require("./teaItems/brand.routes"));
router.use("/teaPackages", require("./teaItems/package.routes"));
router.use("/teaItems", require("./teaItems/teaItem.routes"));
router.use("/teaTypes", require("./teaItems/type.routes"));
router.use("/files", require("./file.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
