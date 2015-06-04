var components = require('adotcomponents');

var queries = {
    places: require('./places')
};

module.exports = components.define({
    name: 'queries',
    init: function init(done){
        return done();
    },
    getQueries: function(name){
        if(!queries[name]) throw new Error('No queries for ' + name);
        return queries[name]
    }
});
