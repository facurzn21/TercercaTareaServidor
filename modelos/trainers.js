const mongoose= require('mongoose');


const trainersSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true},
    
    email: { type: String, required: true },
    password: { type: String, required: true},
    
 });


module.exports = mongoose.model('Trainers', trainersSchema);
 