var util = require('util');
var Transform = require('stream').Transform;
var geolib = require('geolib');
var async = require('async');
var _ = require('lodash');

var PlaceFormatterStream = function () {
    Transform.call(this, {objectMode: true});
};

util.inherits(PlaceFormatterStream, Transform);

PlaceFormatterStream.prototype._transform = function(query, encoding, done){

    var self = this;
    var places = query.places;
    var queryLat = query.lat;
    var queryLon = query.lon;

    console.log(places);

    async.map(places, augment, function(err, augmentedPlaces){
        if(err) return done(err);
        console.log('augmented Places', augmentedPlaces);
        self.emit('result', augmentedPlaces);
        return done();
    });

    function augment(place, callback){
        
        var lat = place.location[1];
        var lon = place.location[0];

        var distance = geolib.getDistance(
            {latitude: lat, longitude: lon},
            {latitude: queryLat, longitude: queryLon}
        );

        place.distance = distance;
        return callback(null, place);
    }
};

module.exports = function(){return new PlaceFormatterStream();};



