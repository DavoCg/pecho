var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var placesCache = require('./modules/places-cache');

var hashtagFilter = require('./modules/hashtag-filter-stream');
var distanceFilter = require('./modules/distance-filter-stream');
var requestFormatter = require('./modules/request-formatter-stream');

placesCache.init();

app.get('/places', function(req, res, next){
    
    var hashtagFilterStream = hashtagFilter();
    var distanceFilterStream = distanceFilter();
    var requestFormatterStream = requestFormatter();

    requestFormatterStream
        .pipe(hashtagFilterStream)
        .pipe(distanceFilterStream);


    requestFormatterStream.write(req.url)
});

app.use(function(err, req, res, next){
    console.log('Error Handler');
    console.error(err);
});

app.listen(3000, function(){
    console.log('server listen port 3000')
});
