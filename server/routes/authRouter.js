const Router = require('express');
const { check } = require('express-validator');

const controller = require('../controllers/authController');
const router = new Router();

router.post('/registration', [
  check('email', 'User name Incorrect').notEmpty(),
  check('password', 'length password must be 4').isLength({ min: 4, max:10 })
], controller.registration);

router.post('/login', controller.login);

module.exports = router;
