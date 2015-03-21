var util = require('util');
var Transform = require('stream').Transform;
var geolib = require('geolib');
var async = require('async');

var match = require('./matching-calculator');

var PlacesFormatterStream = function () {
    Transform.call(this, {objectMode: true});
};

util.inherits(PlacesFormatterStream, Transform);

PlacesFormatterStream.prototype._transform = function(query, encoding, done){

    var self = this;
    var places = query.places;
    var queryLat = query.lat;
    var queryLon = query.lon;

    async.map(places, augmentPlace, function(err, augmentedPlaces){
        if(err) return done(err);
        self.emit('result', augmentedPlaces);
        return done();
    });

    function augmentPlace(place, callback){
        var lat = place.location[1];
        var lon = place.location[0];

        place.distance = geolib.getDistance(
            {latitude: lat, longitude: lon},
            {latitude: queryLat, longitude: queryLon}
        );

        match.getMatching(query.hashtags, place.hashtags, function(err, matching){
            if(err) return callback(err);
            place.matching = matching;
            return callback(null, place);
        });
    }
};

module.exports = function(){return new PlacesFormatterStream();};
