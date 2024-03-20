const { Router } = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/authController');
const router = Router();
const authRouter = Router();

authRouter.use([
  check('email', 'User name Incorrect').notEmpty(),
  check('password', 'length password must be 4').isLength({ min: 4, max: 10 })
]);

authRouter.post('/registration', controller.registration);
authRouter.post('/login', controller.login);

router.use('/auth', authRouter);

module.exports = router;