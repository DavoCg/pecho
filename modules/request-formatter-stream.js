var util = require('util');
var stream = require('stream');

var requiredFields = ['hashtags', 'lat', 'lon', 'distance'];

var FormatRequestStream = function(){
    stream.Transform.call(this, {objectMode: true});
};

util.inherits(FormatRequestStream, stream.Transform);

FormatRequestStream.prototype._transform = function(query, encoding, done){

    requiredFields.forEach(function(field){
        if(!query.hasOwnProperty(field) || !query[field]){
            return done(new Error('Missing or Empty field : ' + field));
        }
    });
    query.hashtags = query.hashtags.split(',');

    this.push(query);
    return done();
};

module.exports = function(){return new FormatRequestStream();};