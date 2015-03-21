var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var errorHandler = require('error-handlers').basic;
var app = express();

mongoose.connect('mongodb://localhost/pecho');

require('./routes/places')(app);

app.use(errorHandler);

module.exports = app;

