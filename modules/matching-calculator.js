var _ = require('lodash');

var match = module.exports = {

    // TODO : Here we can do a lot of algorithms

    getMatching: function(queryArr, placeArr, callback){
        var intersection = _.intersection(queryArr, placeArr);
        var matching = {
            percent: ((intersection.length / queryArr.length) * 100).toFixed()/1,
            hashtags : intersection
        };
        return process.nextTick(callback.bind(null, null, matching));
    }
};