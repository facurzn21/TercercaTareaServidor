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

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    if(!user){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},//_id es porque en mongodb se crea con "_"
      process.env.JWT_KEY,
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  }).catch(error => {
    return res.status(401).json({
      message: 'Invalid auth credentials'
    });
  });
}
