var getAuthMethods = require('controllers').auth;
var authenticator = require('authenticator');
var HTTPStatus = require('http-status');

module.exports = function(app, client){

    var auth = getAuthMethods(client);

    app.post('/login', function(req, res, next){
        var credentials = req.body;
        auth.login(credentials, function(err, isLogged){
            if(err) return next(err);
            if(!isLogged) return res.status(HTTPStatus.NOT_FOUND).send('Unknow email or wrong password');
            return res.status(HTTPStatus.OK).send(isLogged.token)
        });
    });
    app.get('/logout', authenticator, function(req, res, next){
        auth.logout(function(err, isLogout){
            if(err) return next(err);
            if(isLogout) return res.status(HTTPStatus.Ok).send('You are logout')
        });
    });
    app.get('/isauth', authenticator, function(req, res, next){
        return res.status(HTTPStatus.OK).send('You are auth');
    });

};