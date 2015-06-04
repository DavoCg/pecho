var _ = require('lodash');
var validator = require('validator');

var requiredFields = {
    places: ['tags', 'distance', 'lat', 'lon'],
    place: ['lat', 'lon']
};

module.exports = {
    all: function(query){
        var rf = requiredFields['places'];
        var isMissingKey =  _.intersection(_.keys(query), rf).length < rf.length;
        var isEmptyProperty = _.some(_.map(_.values(query), function(x){
            return isEmpty(x);
        }));
        return (!isEmptyProperty & !isMissingKey);
    },

    one: function(query){
        var rf = requiredFields['place'];
        var isMissingKey =  _.intersection(_.keys(query), rf).length < rf.length;
        var isEmptyProperty = _.some(_.map(_.values(query), function(x){
            return isEmpty(x);
        }));
        return (!isEmptyProperty & !isMissingKey);
    }
};


function isEmpty(x){
    return validator.isNull(x);
}
