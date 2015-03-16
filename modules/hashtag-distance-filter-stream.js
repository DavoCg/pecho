var util = require('util');
var Transform = require('stream').Transform;
var mongoose = require('mongoose');
var Place = require('../models/place');
var _ = require('lodash');

const R = 6371;

var HashtagStream = function () {
    Transform.call(this, {objectMode: true});
};

util.inherits(HashtagStream, Transform);

HashtagStream.prototype._transform = function(query, encoding, done){

    var self = this;
    var maxDistance = query.distance; // in meters
    var maxDistanceRadians = (maxDistance/1000) / R;
    var lat = query.lat;
    var lon = query.lon;

    Place
        .where({hashtags : {"$in" : query.hashtags}})
        .where('location')
        .near({center: [lon, lat], maxDistance: maxDistanceRadians, spherical: true})
        .exec(function(err, result){
            if(err) return done(err);
            if(!result.length) return self.emit('no-result', 'No place matching');

            var formattedResult = result.map(function(place){
                return place.toObject();
            });
            query.places = formattedResult;

            self.push(query);
            return done();
        });
};

module.exports = function(){return new HashtagStream();};