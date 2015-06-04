var components = require('adotcomponents');
var jwt = require('jsonwebtoken');
var HTTPStatus = require('http-status');
var md5 = require('MD5');

module.exports = components.define({
    name: 'authentication',
    required: ['server', 'queries', 'database', 'validator'],
    init: function init(done){
        this.checker = this.validator.getValidator('owners');
        this.q = this.queries.getQueries('owners');
        this.server.addRoute('post', '/login/owners', this.loginOwner);
        return done();
    },

    /**
     * Login for an owner
     * @param req
     * @param res
     * @param next
     * @returns {Request}
     */

    loginOwner: function(req, res, next){
        var self = this;
        var isBodyValid = this.checker.add(req.body);
        if(!isBodyValid) return res.status(HTTPStatus.BAD_REQUEST).send('Wrong login body');

        var params = {
            index: 'owners',
            type: 'account',
            query: this.q.oneByEmail(req.body.email)
        };
        this.database.get(params, function(err, result){
            if(err) return next(err);
            if(!result.length) return res.status(HTTPStatus.UNAUTHORIZED).send('No mail match');
            if(!checkPassword(req.body.password, result[0].password)) return res.status(HTTPStatus.UNAUTHORIZED).send('wrong password');
            var token = generateToken.call(self, result[0]);
            return res.status(HTTPStatus.OK).send({token: token})
        })
    },

    /**
     * Middleware for attach req.user
     * @param req
     * @param res
     * @param next
     * @returns {Request}
     */

    isAuth: function(req, res, next){
        var token = req.headers.token;
        var secret = this.config.token.secret;

        if(!token) return res.status(HTTPStatus.UNAUTHORIZED).send('Please log in');
        jwt.verify(token, secret, function(err, decoded){
            if(err) return next(err);
            if(Math.round(Date.now()/1000) > decoded.exp) return res.status(HTTPStatus.UNAUTHORIZED).send('Token expired');
            req.user = decoded;
            return next();
        });
    },

    /**
     * Middleware to control resource access
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */

    hasAccess: function(req, res, next){
        if(!req.user) return res.status(HTTPStatus.UNAUTHORIZED).send('No req user');
        this.error('REQ USER', req.user);
        return next();
    }
});

/**
 * Util Function to generate an access Token
 * @param user
 */

function generateToken(user){
    var secret = this.config.token.secret;
    var options = {
        expiresInSeconds: this.config.token.expiresInMinutes,
        ignoreExpiration: true
    };
    return jwt.sign({ user: user }, secret, options);
}

function checkPassword(password, dbPassword){
    return dbPassword === md5(password);
}
