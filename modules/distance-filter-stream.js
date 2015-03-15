var util = require('util');
var stream = require('stream');
var _ = require('lodash');
var async = require('async');
var distance = require('google-distance');

var DistanceStream = function () {
    stream.Transform.call(this, {objectMode: true});
};

util.inherits(DistanceStream, stream.Transform);

DistanceStream.prototype._transform = function (query, encoding, done) {

    var validPlaces = [];

    async.each(query.validPlaces, checkDistance, function(err){
        if(err) return done(err);
        return done();
    });

    // TODO : let the user chose the mode
    function checkDistance(place, callback){
        var options = {
                origin: query.lat+','+query.lon,
                destination: place.lat+','+place.lon,
                mode: 'walking'
            };

        distance.get(options, function(err, result){
            if(err) return callback(err);
            if(result.distanceValue < query.distance){
                place.travelInfos = result;
                validPlaces.push(place);
            }
            callback();
        })
    }
};

module.exports = function(){
    return new DistanceStream();
};
