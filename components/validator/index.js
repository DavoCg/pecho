var components = require('adotcomponents');

var validators = {
    places : require('./places'),
    owners : require('./owners')
};

module.exports = components.define({
    name: 'validator',
    init: function init(done){
        return done();
    },
    getValidator: function(name){
        if(!validators[name]) throw new Error('No validator for ' + name);
        return validators[name]
    }
});
