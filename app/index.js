var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('configator');
var errorHandler = require('error-handlers').basic;

var app = express();

//mongoose.connect(config.get('database').url);
mongoose.connect('mongodb://localhost/pecho');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cors());

require('./routes/auth')(app);
require('./routes/users')(app);
require('./routes/places')(app);

app.use(errorHandler);

module.exports = app;
