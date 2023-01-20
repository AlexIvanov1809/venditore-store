const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/itemTypes", require("./itemTypes.routes"));
router.use("/coffeeItems", require("./coffeeItem.routes"));
router.use("/teaItems", require("./teaItem.routes"));
router.use("/files", require("./file.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
