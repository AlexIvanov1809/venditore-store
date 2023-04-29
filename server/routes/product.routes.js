const Router = require('express');
const router = new Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/CheckRole.middleware');

router.post('/', authMiddleware(), productController.create);
router.delete('/:id', authMiddleware(), productController.delete);
router.patch('/:id', authMiddleware(), productController.edit);
router.get('/', productController.getAll);
router.get('/search', productController.search);
router.get('/:id', productController.getOne);

module.exports = router;
