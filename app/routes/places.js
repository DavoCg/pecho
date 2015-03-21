var places = require('controllers').places;
var authenticator = require('authenticator');

var placesRoutes = function(app){
    app.get('/places', authenticator, places.getPlaces);
    app.get('/places/:id', authenticator, places.getPlace);
};

module.exports = placesRoutes;