const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

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

      const { role } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      let hasRole = false;
      if (roles.includes(role)) {
        hasRole = true;
      }

      if (!hasRole) {
        return next(ApiError.forbidden());
      }

      next();
    } catch (e) {
      next(ApiError.unauthorizedError());
    }
  };
};
