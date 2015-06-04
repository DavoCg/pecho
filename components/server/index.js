var components = require('adotcomponents');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

module.exports = components.define({
    name: 'server',
    init: function init(done){
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.listen(this.config.port, this.config.bind, done);
    },
    addRoute: function addRoute(method, route, fn, options){
        if(options && options.middlewares){
            var args = _.flatten([route, options.middlewares, fn]);
            return this.app[method].apply(this.app, args)
        }
        return this.app[method](route, fn);
    }
});
