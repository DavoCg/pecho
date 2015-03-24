var places = require('controllers').places;
var authenticator = require('authenticator');

var placesRoutes = function(app){
    app.get('/places', authenticator, function getPlaces(req, res, next){
        places.getPlaces(req.query, function(err, places){
            if(err) return next(err);
            return res.status(200).send(places);
        });
    });
    app.get('/places/:id', authenticator, function getPlace(req, res, next){
        var params = {query: req.query, id: req.params.id};
        places.getPlace(params, function(err, place){
            if(err) return next(err);
            if(!place) return res.status(404).send('Not Found');
            return res.status(200).send(place);
        });
    });
};

module.exports = placesRoutes;