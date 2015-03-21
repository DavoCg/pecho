var geolib = require('geolib');
var Place = require('../models/place');


var isQueryValid = require('./query-validator');

var place = module.exports = {
    get: function(query, cb){

        var requiredFields = ['lat', 'lon'];

        if(!isQueryValid(query, requiredFields)) return cb(new Error('Empty lat or lon'));
        Place
            .where({_id : query.id})
            .findOne(function(err, place){
                if(err) return process.nextTick(cb.bind(null, err));
                place = place.toObject();
                place.distance = geolib.getDistance(
                    {latitude: query.lat, longitude: query.lon},
                    {latitude: place.location[1], longitude: place.location[0]}
                );
                return process.nextTick(cb.bind(null, null, place));
            })
    }
};
