var components = require('adotcomponents');
var jwt = require('jsonwebtoken');
var HTTPStatus = require('http-status');

module.exports = components.define({
    name: 'authentication',
    required: ['server'],
    init: function init(done){
        return done();
    },

    isAuth: function(req, res, next){
        var token = req.headers.token;
        var secret = 'seCretString97NotTobeHere@';

        if(!token) return res.status(HTTPStatus.UNAUTHORIZED).send('Please log in');
        jwt.verify(token, secret, function(err, decoded){
            if(err) return next(err);
            if(Math.round(Date.now()/1000) > decoded.exp) return res.status(HTTPStatus.UNAUTHORIZED).send('Token expired');
            req.user = decoded;
            return next();
        });
    }
});
