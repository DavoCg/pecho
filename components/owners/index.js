var components = require('adotcomponents');

module.exports = components.define({
    name: 'owners',
    required: ['server', 'database', 'authentication'],
    init: function init(done){
        this.server.addRoute('post', '/owners', this.addOwner);
        return done();
    },
    addOwner: function addOwner(req, res, next){

    }
});
