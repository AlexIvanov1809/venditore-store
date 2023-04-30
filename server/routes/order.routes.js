const Router = require('express');
const router = new Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.sendOrder);

module.exports = router;
