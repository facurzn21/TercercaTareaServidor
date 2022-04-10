const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../modelos/user');


exports.registro = (req, res, next) => {
    bcrypt.hash(req.body.password, 16).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then(result => {
        res.status(201).json({
          message: 'usuario creado',
          result: result
        });
      }).catch(err => {
        res.status(500).json({
          message: 'Credenciales invalidas'
        });
      });
    });
}