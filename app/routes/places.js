var places = require('handlers').places;

var placesRoutes = function(app){
    app.get('/places', places.getPlaces);
};

module.exports = placesRoutes;