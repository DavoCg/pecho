var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var placesCache = require('./modules/places-cache');

var hashtagFilter = require('./modules/hashtag-filter-stream');
var distanceFilter = require('./modules/distance-filter-stream');
var requestFormatter = require('./modules/request-formatter-stream');

placesCache.init();

var timeAdder = 0;
var counter = 0;
var startDate = 0;

app.get('/places', function(req, res, next){

    startDate = Date.now();
    counter++;

    var hashtagFilterStream = hashtagFilter();
    var distanceFilterStream = distanceFilter();
    var requestFormatterStream = requestFormatter();

    requestFormatterStream
        .pipe(hashtagFilterStream).on('no-result', handleNoresult).on('result', handleResult.bind(null, res))
        .pipe(distanceFilterStream).on('no-result', handleNoresult).on('result', handleResult.bind(null, res));

    requestFormatterStream.write(req.url)
});

function handleNoresult(reason){
    console.log('No result because of: ', reason);
}

function handleResult(res, validPlaces){
    console.log('Duration : ', Date.now() - startDate);
    timeAdder += (Date.now() - startDate);
    console.log('Average duration :', timeAdder / counter);

    res.json(validPlaces);
}

app.use(function(err, req, res, next){
    console.log('Error Handler');
    console.error(err);
});

app.listen(3000, function(){
    console.log('server listen port 3000')
});
