const express = require('express');
const router = express.Router();
const UserController = require('../controladores/userController');

router.post('/signup', UserController.registro); //se llama a  registro  desde el controlador 
router.post('/login', UserController.login); //se llama a  login  desde el controlador 

module.exports = router;