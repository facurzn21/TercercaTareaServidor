const mongoose= require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
 });
userSchema.plugin(uniqueValidator); // se usa plugin para comprobar que el correo sea unico

module.exports = mongoose.model('User', userSchema);
 