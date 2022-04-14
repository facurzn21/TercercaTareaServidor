const Trainers = require("../modelos/trainers");

exports.getTrainers = (req, res, next) => {
    Trainers.find().then(documents =>{   // Busco todos los trainers en la base de datos y los devuelvo
        console.log(documents);
        res.status(200).json({
            trainers: documents  // si la respuesta fue correcta se devuelven los trainers
        });
    }).catch((error) => {
        console.log(error);
    });
}
