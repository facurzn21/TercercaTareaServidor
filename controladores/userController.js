const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../modelos/user');


exports.registro = (req, res, next) => { 
    bcrypt.hash(req.body.password, 16).then(hash => { // uso de bcrypt para encriptar la contraseña 
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

exports.login = (req, res, next) => { // se busca el usuario con el correo que ingresa
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    console.log(user);
    if(!user){
      return res.status(401).json({
        message: 'Auth failed' // sino se encuentra el usuario se devuelve error
      });
    }
    fetchedUser = user;  // si se encuentra usuario se guarda en una variable
    console.log(fetchedUser);
    return bcrypt.compare(req.body.password, user.password); // compara contraseña de logeo con la contraseña hash de la BD
  }).then(result => {
    console.log(result);
    if(!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(  // se devuelve token cuando se logea
      {email: fetchedUser.email, userId: fetchedUser._id},//_id es porque en mongodb se crea con "_"
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  }).catch(error => {
    console.log(error)
    return res.status(401).json({
      message: 'Invalid auth credentials'
    });
  });
}
