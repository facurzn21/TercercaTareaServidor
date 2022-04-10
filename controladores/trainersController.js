const Trainers = require("../modelos/trainers");

exports.getTrainers = (req, res, next) => {
    Trainers.find().then(documents =>{
        console.log(documents);
        res.status(200).json({
            trainers: documents
        });
    }).catch((error) => {
        console.log(error);
    });
}
