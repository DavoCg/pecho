var util = require('util');
var stream = require('stream');
var url = require('url');
var querystring = require('querystring');

var requiredFields = ['hashtags', 'lat', 'lon', 'distance'];

var FormatRequestStream = function(){
    stream.Transform.call(this, {objectMode: true});
};

util.inherits(FormatRequestStream, stream.Transform);

FormatRequestStream.prototype._transform = function (requestUrl, encoding, done) {
    var queryString = url.parse(requestUrl).query;
    var query = querystring.parse(queryString);

    requiredFields.forEach(function(field){
        if(!query.hasOwnProperty(field) || query[field] === ''){
            return done(new Error('Missing or Empty field : ' + field));
        }
    });

    query.hashtags = query.hashtags.split(',');
    query.distance = +query.distance;

    this.push(query);
    return done();
};

module.exports = function(){
    return new FormatRequestStream();
};