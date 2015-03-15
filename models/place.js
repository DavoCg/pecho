var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Place = new Schema({
    name: {type: String},
    hashtags: {type: Array},
    location: {type: Array}
});

Place.index({location: '2dsphere'});

var PlaceModel = mongoose.model('Place', Place, 'Places');

module.exports = PlaceModel;
