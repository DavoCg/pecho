var util = require('util');
var stream = require('stream');
var _ = require('lodash');

var placesCache = require('../modules/places-cache');

var HashtagStream = function () {
    stream.Transform.call(this, {objectMode: true});
};

util.inherits(HashtagStream, stream.Transform)

HashtagStream.prototype._transform = function (query, encoding, done) {
    var places = placesCache.getCache();

    var validPlaces = places.filter(function(place){
        return _.intersection(place.hashtags, query.hashtags).length > 0;
    })
    if(validPlaces.length === 0) return this.emit('no-result', 'No places for these hashtags');

    query.validPlaces = validPlaces;

    this.push(query);
    return done();
};

module.exports = function(){
  return new HashtagStream();
};
