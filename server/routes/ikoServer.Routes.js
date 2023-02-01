const express = require("express");
const ikoServerController = require("../controllers/ikoServer.controller");
const router = express.Router({ mergeParams: true });

router.get("/", ikoServerController.getItems);
router.post("/", ikoServerController.fetchAllItems);

module.exports = router;
