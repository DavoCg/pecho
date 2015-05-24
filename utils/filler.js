var request = require('superagent');
var generatePlace = require('./faker');
var async = require('async');

var url = 'http://localhost:9200/places/restaurant';
var nbRandoms = 100;

async.eachLimit(generateRandoms(nbRandoms), 10, postData, function(err){
    if(err) return console.log(err);
    return console.log('FINISH');
});

function postData(data, callback){
    request
        .post(url)
        .type('json')
        .send(JSON.stringify(data))
        .end(function(err, res){
            if(err) return callback(err);
            return callback();
        });
}

function generateRandoms(nb){
    var randoms = [];
    while(nb--){ randoms.push(generatePlace());}
    return randoms;
}