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
    var self = this;

    async.each(query.validPlaces, checkDistance, function(err){
        if(err) return done(err);
        if(validPlaces.length === 0) return self.emit('no-result', 'No places in your area');
        self.emit('result', validPlaces);
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
