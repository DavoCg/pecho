var app = require('./app');

app.listen(app.config.port, app.config.bind, function(){
    console.log('Server listen port ' + app.config.port);
});