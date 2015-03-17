var util = require('util');
var Transform = require('stream').Transform;
var _ = require('lodash');

var requiredFields = ['hashtags', 'lat', 'lon', 'distance'];

var FormatRequestStream = function(){
    Transform.call(this, {objectMode: true});
};

util.inherits(FormatRequestStream, Transform);

FormatRequestStream.prototype._transform = function(query, encoding, done){

    if(!isQueryValid(query)) return done(new Error('Missing or Empty field'));
    query.hashtags = query.hashtags.split(',');

    this.push(query);
    return done();
};

module.exports = function(){return new FormatRequestStream();};

function isQueryValid(query){
    var queryKeys = Object.keys(query);
    var emptyProperty = false;
    var missingKey = _.intersection(queryKeys, requiredFields).length < requiredFields.length;
    _.forIn(query, function(value, key) {
        if(!value) emptyProperty = true;
    });

    return (!emptyProperty & !missingKey);
}