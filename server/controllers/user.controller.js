const ApiError = require("../error/ApiError");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации"));
      }
      const { email, password, role } = req.body;

      const userData = await userService.registration(email, password, role);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // + secure: true if https

      delete userData.refreshToken;

      return res.json(userData);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      delete userData.refreshToken;

      return res.json(userData);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      delete userData.refreshToken;

      return res.json(userData);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new UserController();
