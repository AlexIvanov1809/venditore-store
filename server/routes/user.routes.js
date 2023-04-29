const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/CheckRole.middleware');

router.post(
  '/registration',
  // authMiddleware(),
  body('email').isEmail().withMessage('Указан неверный email'),
  body('password')
    .isLength({ min: 8, max: 32 })
    .withMessage('Пароль содержит меньше 8 символов'),
  userController.registration,
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

module.exports = router;
