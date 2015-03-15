var places = require('../mocks/db-mocks');
var _cache = [];

var placesCache = {
    init: function init(client, done){
        console.log('Initialization cache');
        places.forEach(function(place){
            _cache.push(place);
        })
    },
    getCache: function getCache(){
        return _cache;
    }
};

module.exports = placesCache;