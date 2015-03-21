var util = require('util');
var Transform = require('stream').Transform;
var isQueryValid = require('./query-validator');

var FormatRequestStream = function(){
    Transform.call(this, {objectMode: true});
};

util.inherits(FormatRequestStream, Transform);

FormatRequestStream.prototype._transform = function(query, encoding, done){
    var requiredFields = ['hashtags', 'lat', 'lon', 'distance'];
    if(!isQueryValid(query, requiredFields)) return done(new Error('Missing or Empty field'));
    query.hashtags = query.hashtags.split(',');

    this.push(query);
    return done();
};

module.exports = function(){return new FormatRequestStream();};

