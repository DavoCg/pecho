var components = require('adotcomponents');
var elasticsearch = require('elasticsearch');
var formatter = require('./es-formatter');

module.exports = components.define({
    name: 'database',
    init: function init(done){
        this.client = new elasticsearch.Client({
            host: this.config.host + ':' + this.config.port
        });
        return done();
    },

    add: function add(params, done){
        if(!params.index || !params.type || !params.body){
            return done(new Error('Invalid options'));
        }
        this.client.create({
            index: params.index,
            type: params.type,
            body: params.body
        }, done)
    },

    get: function get(params, done){
        if(!params.index) return done(new Error('Invalid options'));

        this.client.search({
            index: params.index,
            type: params.type,
            body: params.query
        }, function(err, response){
            if(err) return done(err);
            return done(null, formatter.formatSearch(response))
        });
    },

    update: function update(params, done){
        return done();
    },

    del: function del(params, done){
        return done();
    }


});
