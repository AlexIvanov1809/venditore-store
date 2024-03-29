class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static unauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован.');
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden() {
    return new ApiError(403, 'Нет доступа');
  }
}

module.exports = ApiError;
