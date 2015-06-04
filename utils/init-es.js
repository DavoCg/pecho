var request = require('superagent');
var async = require('async');
var filler = require('./filler');
var templatePlaces = require('./fixtures/template-places.json');
var templateOwners = require('./fixtures/template-owners.json');

async.series([deletePlaces, deleteOwners, addPlacesTemplate, addOwnersTemplate, fill], function(err, results){
    if(err) return console.log(err);
    return console.log('FINISH');
});

function deletePlaces(callback){
    request
        .head('http://localhost:9200/places')
        .end(function(err, res){
            if(res.statusCode === 404) return callback();
            request
                .del('http://localhost:9200/places')
                .end(callback);
        })
}

function deleteOwners(callback){
    request
        .head('http://localhost:9200/owners')
        .end(function(err, res){
            if(res.statusCode === 404) return callback();
            request
                .del('http://localhost:9200/owners')
                .end(callback);
        })
}

function addPlacesTemplate(callback){
    request
        .put('http://localhost:9200/_template/places')
        .type('json')
        .send(templatePlaces)
        .end(callback);
}

function addOwnersTemplate(callback){
    request
        .put('http://localhost:9200/_template/owners')
        .type('json')
        .send(templateOwners)
        .end(callback);
}

function fill(){
    return filler();
}
