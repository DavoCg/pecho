var util = require('util');
var stream = require('stream');
var _ = require('lodash');
var mongoose = require('mongoose');
var Place = require('../models/place');

var R = 6371;

var HashtagStream = function () {
    stream.Transform.call(this, {objectMode: true});
};

util.inherits(HashtagStream, stream.Transform);

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
            self.emit('result', result);
            self.push(result);
            return done();
        });
};

module.exports = function(){return new HashtagStream();};
