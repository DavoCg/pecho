var HTTPStatus = require('http-status');
var async = require('async');

module.exports = function(app, client){

    app.get('/health', function(req, res, next){
        async.parallel([
                function(callback){
                    client.ping({}, function(err){
                        if(err) return callback(err);
                        return callback(null, 'OK')
                    })
                }
            ],
            function(err){
                if(err) return next(err);
                return res.status(HTTPStatus.OK).send();
            });
    });

};