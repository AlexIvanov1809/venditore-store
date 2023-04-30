const ApiError = require('../error/ApiError');
const tokenService = require('../services/token.service');

module.exports = function (roles = ['ADMIN', 'OWNER']) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return next(ApiError.unauthorizedError());
      }

      const userData = tokenService.validateAccessToken(token);
      if (!userData) {
        return next(ApiError.unauthorizedError());
      }

      let hasRole = false;
      if (roles.includes(userData.role)) {
        hasRole = true;
      }

      if (!hasRole) {
        return next(ApiError.forbidden());
      }
      req.user = userData;
      next();
    } catch (e) {
      next(ApiError.unauthorizedError());
    }
  };
};
