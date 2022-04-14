const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = { // Se usa opciones segun la documentacion de CORS
  origin: 'http://localhost:3001',
  credentials: true,
  optionSuccessStatus:200
}

// importo rutas
const userRoutes = require('./rutas/user'); 
const trainersRoutes = require('./rutas/trainers');

const app = express();
const mongoURI = "mongodb+srv://ServerTerceraTarea:Raizen2121212035@cluster0.ca24q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) // Se usa mongoose para conectarse a MongoDB Atlas
  .then(() => {
    console.log('Connected to mongodb');
  }).catch((error) => {
    console.log('Error connecting to mongo ', error);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Se agrega controles de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
    next();
});

// Se agrega direcciones de endpoints 
app.use('/api/user', userRoutes);
app.use('/api/trainers', trainersRoutes);


module.exports = app;