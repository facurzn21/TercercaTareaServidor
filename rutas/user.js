const express = require('express');
const router = express.Router();
const UserController = require('../controladores/userController');

router.post('/signup', UserController.registro);
//router.post('/login', UserController.login);

module.exports = router;