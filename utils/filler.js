var request = require('superagent');
var generatePlace = require('./faker');
var async = require('async');
var md5 = require('MD5');

var urlPlaces = 'http://localhost:9200/places/restaurant';
var urlOwners = 'http://localhost:9200/owners/account';
var nbRandoms = 100;

function addAdminOwner(callback){
    var user = {
        email: 'admin@pecho.fr',
        password: md5('admin'),
        admin: true
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
                addAdminOwner(callback)
            }
        ],
        function(err){
            if(err) return console.log(err);
            console.log('FINISH');
        });
}

module.exports = filler;