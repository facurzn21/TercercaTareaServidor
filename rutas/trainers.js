const express = require('express');
const router = express.Router();
const TrainersController = require('../controladores/trainersController');

router.get('', TrainersController.getTrainers);


module.exports = router;