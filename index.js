var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

//places
var requestFormatter = require('./modules/request-formatter-stream');
var hashtagDistanceFilter = require('./modules/hashtag-distance-filter-stream');
var placesFormatter = require('./modules/places-formatter-stream');

var place = require('./modules/place');

mongoose.connect('mongodb://localhost/pecho');

app.get('/places', function(req, res, next){

    var requestFormatterStream = requestFormatter();
    var hashtagDistanceFilterStream = hashtagDistanceFilter();
    var placesFormatterStream = placesFormatter();

    requestFormatterStream
        .pipe(hashtagDistanceFilterStream)
        .pipe(placesFormatterStream)
        .on('no-result', handleNoresult.bind(null, res))
        .on('result', handleResult.bind(null, res));

    requestFormatterStream.write(req.query)
});

app.get('/place/:id', function(req, res, next){
    req.query.id = req.params.id;
    place.get(req.query, function(err, result){
        if(err) throw err;
        handleResult(res, result);
    })
});

function handleNoresult(res, reason){
    console.log('No result because of: ', reason);
    res.json({});
}

function handleResult(res, data){
    res.json(data);
}

app.use(function errorhandler(err, req, res, next){
    console.error('Error Handler: ' + err.message);
    res.json(err.message);
});

app.listen(3000, function(){
    console.log('server listen port 3000')
});
