var util = require('util');
var Transform = require('stream').Transform;

var requiredFields = ['hashtags', 'lat', 'lon', 'distance'];

var FormatRequestStream = function(){
    Transform.call(this, {objectMode: true});
};

util.inherits(FormatRequestStream, Transform);

FormatRequestStream.prototype._transform = function(query, encoding, done){

    var missingKey = false;
    requiredFields.forEach(function(field){
        if(!query.hasOwnProperty(field) || !query[field]){
            missingKey = true;
        }
    });
    if(missingKey) return done(new Error('Missing or Empty field'))

    query.hashtags = query.hashtags.split(',');

    this.push(query);
    return done();
};

module.exports = function(){return new FormatRequestStream();};