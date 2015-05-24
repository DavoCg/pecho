var request = require('superagent');
var async = require('async');
var template = require('./fixtures/template.json');

async.series([deletePlaces, deleteTemplate, addTemplate], function(err, results){
    if(err) return console.log(err);
    return console.log('FINISH');
});

function deletePlaces(callback){
    request
        .del('http://localhost:9200/places')
        .end(callback);
}

function deleteTemplate(callback){
    request
        .del('http://localhost:9200/_template')
        .end(callback);
}

function addTemplate(callback){
    request
        .put('http://localhost:9200/_template')
        .type('json')
        .send(template)
        .end(callback);
}


