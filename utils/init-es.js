var request = require('superagent');
var async = require('async');
var template = require('./fixtures/template.json');

async.series([deletePlaces, addTemplate], function(err, results){
    if(err) return console.log(err);
    return console.log('FINISH');
});

function deletePlaces(callback){
    request
        .del('http://localhost:9200/places')
        .end(callback);
}

function addTemplate(callback){
    request
        .put('http://localhost:9200/_template/places')
        .type('json')
        .send(template)
        .end(callback);
}


