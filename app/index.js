var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var config = require('configator');
var errorHandler = require('error-handlers').basic;

var app = express();

mongoose.connect(config.get('database').url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

require('./routes/auth')(app);
require('./routes/places')(app);

app.use(errorHandler);



module.exports = app;

