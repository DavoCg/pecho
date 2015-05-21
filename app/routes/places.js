var getPlacesMethods = require('controllers').places;
var authenticator = require('authenticator');
var HTTPStatus = require('http-status');

var placesRoutes = function(app, client){

    var places = getPlacesMethods(client);

    app.get('/places', /*authenticator,*/ function getPlaces(req, res, next){
        places.getPlaces(req.query, function(err, places){
            if(err) return next(err);
            return res.status(HTTPStatus.OK).send(places);
        });
    });

    app.get('/places/:id', /*authenticator,*/ function getPlace(req, res, next){
        var params = {query: req.query, id: req.params.id};
        places.getPlace(params, function(err, place){
            if(err) return next(err);
            if(!place) return res.status(HTTPStatus.NOT_FOUND).send('Oups Place not found');
            return res.status(HTTPStatus.OK).send(place);
        });
    });

    app.post('/places', /*authenticator,*/ function addPlace(req, res, next){
        var place = req.body;
        places.addPlace(place, function(err, place){
            if(err) return next(err);
            return res.status(HTTPStatus.OK).send(place);
        });
    });
};

module.exports = placesRoutes;