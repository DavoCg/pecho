var components = require('adotcomponents');
var config = require('adotconfig');
var pkg = require('./package.json');

components.load(function onLoad(err){
    if(err) throw err;
    return components.create(function onCreate(err){
        if(err) throw err;
    });
});
