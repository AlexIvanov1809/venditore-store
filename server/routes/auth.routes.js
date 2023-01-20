const express = require("express");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/signUp",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  userController.registration,
);
router.post("/signInWithPassword", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

module.exports = router;
