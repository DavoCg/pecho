var auth = require('controllers').auth;

module.exports = function(app){
    app.post('/login', auth.login);
    app.get('logout', auth.logout);
};