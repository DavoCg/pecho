var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var errorHandler = require('error-handlers').basic;

var config = require('configator');
var dbConfig = config.get('database');
var serverConfig = config.get('server');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: dbConfig.host + ':' + dbConfig.port
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cors());

require('./routes/auth')(app, client);
require('./routes/places')(app, client);
require('./routes/health')(app, client);

app.use(errorHandler);

app.config = serverConfig;
module.exports = app;
