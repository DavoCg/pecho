var components = require('adotcomponents');

var queries = {
    places: require('./places'),
    owners: require('./owners')
};

module.exports = components.define({
    name: 'queries',
    init: function init(done){
        return done();
    },

    /**
     * Return all available queries (ex: for places or owners)
     * @param name
     * @returns {*}
     */

    getQueries: function(name){
        if(!queries[name]) throw new Error('No queries for ' + name);
        return queries[name]
    }
});
