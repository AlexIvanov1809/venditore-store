const Router = require('express');
const router = new Router();
const priceController = require('../controllers/price.controller');
const authMiddleware = require('../middleware/CheckRole.middleware');

router.delete('/:id', authMiddleware(), priceController.delete);

module.exports = router;
