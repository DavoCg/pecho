var components = require('adotcomponents');
var HTTPStatus = require('http-status');
var md5 = require('MD5');
var _ = require('lodash');

module.exports = components.define({
    name: 'owners',
    required: ['server', 'database', 'validator', 'authentication'],
    init: function init(done){
        var auth = this.authentication;
        this.checker = this.validator.getValidator('owners');
        this.server.addRoute('post', '/owners', this.addOwner, {middlewares: [auth.isAuth, auth.isAdmin]});
        return done();
    },

    /**
     * Add a place owner
     * @param req
     * @param res
     * @param next
     * @returns {Request}
     */

    addOwner: function addOwner(req, res, next){
        this.error('body', req.body);
        var isBodyValid = this.checker.add(req.body);
        if(!isBodyValid) return res.status(HTTPStatus.BAD_REQUEST).send('Wrong body');

        var params = {
            index: 'owners',
            type: 'account',
            body: _.assign(req.body, {password: md5(req.body.password)})
        };

        //TODO check user doesnt exist

        this.database.add(params, function(err){
            if(err) return next(err);
            return res.status(HTTPStatus.OK).send('Owner well add');
        })
    }
});
