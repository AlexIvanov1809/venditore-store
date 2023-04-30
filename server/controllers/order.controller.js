const ApiError = require('../error/ApiError');
const orderService = require('../services/order.service');

class OrderController {
  async sendOrder(req, res, next) {
    try {
      const { message } = req.body;
      const response = await orderService.sendOrder(message);

      return res.json(response);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new OrderController();
