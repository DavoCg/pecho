var getAuthMethods = require('controllers').auth;
var authenticator = require('authenticator');

module.exports = function(app, client){

    var auth = getAuthMethods(client);

    app.post('/login', function(req, res, next){
        var credentials = req.body;
        auth.login(credentials, function(err, result){
            if(err) return next(err);
            return res.status(result.statusCode).send(result.data);
        });
    });
    app.get('/logout', authenticator, function(req, res, next){
        auth.logout(function(err, result){
            if(err) return next(err);
            return res.status(result.statusCode).send(result.data)
        });
    });
    app.get('/isauth', authenticator, function(req, res, next){
        return res.status(200).send();
    });

};