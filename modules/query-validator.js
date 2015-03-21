var _ = require('lodash');

module.exports = function isQueryValid(query, requiredFields){
    var queryKeys = Object.keys(query);
    var emptyProperty = false;
    var missingKey = _.intersection(queryKeys, requiredFields).length < requiredFields.length;
    _.forIn(query, function(value, key) {
        if(!value) emptyProperty = true;
    });

    return (!emptyProperty & !missingKey);
};

