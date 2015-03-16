var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var requestFormatter = require('./modules/request-formatter-stream');
var hashtagDistanceFilter = require('./modules/hashtag-distance-filter-stream');

mongoose.connect('mongodb://localhost/pecho');

app.get('/places', function(req, res, next){

    var requestFormatterStream = requestFormatter();
    var hashtagDistanceFilterStream = hashtagDistanceFilter();

    requestFormatterStream
        .pipe(hashtagDistanceFilterStream)
        .on('no-result', handleNoresult.bind(null, res))
        .on('result', handleResult.bind(null, res));

    requestFormatterStream.write(req.query)
});

function handleNoresult(res, reason){
    console.log('No result because of: ', reason);
    res.json([]);
}

function handleResult(res, validPlaces){
    console.log('results sent');
    res.json(validPlaces);
}

app.use(function(err, req, res, next){
    console.log('Error Handler');
    console.error(err);
});

app.listen(3000, function(){
    console.log('server listen port 3000')
});
