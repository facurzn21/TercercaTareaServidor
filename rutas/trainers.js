const express = require('express');
const router = express.Router();
const TrainersController = require('../controladores/trainersController');

router.get('', TrainersController.getTrainers);  //se llama a get trainers desde el controlador 


module.exports = router;