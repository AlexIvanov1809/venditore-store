const Router = require('express');
const router = new Router();
const pictureController = require('../controllers/picture.controller');
const authMiddleware = require('../middleware/CheckRole.middleware');

router.post('/:productId/:index', authMiddleware(), pictureController.create);
router.patch('/:id', authMiddleware(), pictureController.update);
router.delete('/:id', authMiddleware(), pictureController.delete);

module.exports = router;
