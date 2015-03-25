var users = require('controllers').users;

var usersRoutes = function(app){
    app.post('/users', function addUser(req, res, next){
        var user = req.body;
        users.addUser(user, function(err, result){
            if(err) return next(err);
            return res.status(result.statusCode).send(result.data);
        });
    });
};

module.exports = usersRoutes;