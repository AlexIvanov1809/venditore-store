const Router = require('express');
const router = new Router();
const productTypesController = require('../controllers/productTypes.controller');
const authMiddleware = require('../middleware/CheckRole.middleware');

router.post('/:type', authMiddleware(), productTypesController.create);
router.patch('/:type/:id', authMiddleware(), productTypesController.update);
router.delete('/:type/:id', authMiddleware(), productTypesController.delete);
router.get('/:type', productTypesController.getAll);
router.get('/:type/filter/:entityId', productTypesController.getAllForFilter);

module.exports = router;
