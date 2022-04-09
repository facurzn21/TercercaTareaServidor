const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const app = express();

// const mongoURI = "mongodb+srv://alejandrorp:" + process.env.MONGO_ATLAS_PW + "@cluster0.3snja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
/*
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to mongodb');
  }).catch((error) => {
    console.log('Error connecting to mongo ', error);
  });
*/

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
    next();
});



module.exports = app;