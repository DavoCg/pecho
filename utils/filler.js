var request = require('superagent');
var generatePlace = require('./faker');
var async = require('async');

var urlPlaces = 'http://localhost:9200/places/restaurant';
var urlOwners = 'http://localhost:9200/owners/account';
var nbRandoms = 100;

function addUser(callback){
    var user = {
        email: 'owner@test.fr',
        password: '72122ce96bfec66e2396d2e25225d70a', //owner in MD5
        places: ['123abc']
    };

    request
        .post(urlOwners)
        .type('json')
        .send(JSON.stringify(user))
        .end(function(err, res){
            if(err) return callback(err);
            return callback();
        });
}

function postData(data, callback){
    request
        .post(urlPlaces)
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


function filler(){
    async.parallel([
            function(callback){
                async.eachLimit(generateRandoms(nbRandoms), 10, postData, callback);
            },
            function(callback){
                addUser(callback)
            }
        ],
        function(err){
            if(err) return console.log(err);
            console.log('FINISH');
        });
}

module.exports = filler;