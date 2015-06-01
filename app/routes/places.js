var getPlacesMethods = require('controllers').places;
var authenticator = require('authenticator');
var HTTPStatus = require('http-status');
var _ = require('lodash');

var placesRoutes = function(app, client){

    var places = getPlacesMethods(client);

    app.get('/places', function getPlaces(req, res, next){
        places.getPlaces(req.query, function(err, places){
            if(err) return next(err);
            if(!places) return res.status(HTTPStatus.NOT_FOUND).send('Oups no results for your query');
            return res.status(HTTPStatus.OK).send(places);
        });
    });

    app.get('/places/:id', function getPlace(req, res, next){
        var params = {query: req.query, id: req.params.id};
        places.getPlace(params, function(err, place){
            if(err) return next(err);
            if(!place) return res.status(HTTPStatus.NOT_FOUND).send('Oups Place not found');
            return res.status(HTTPStatus.OK).send(place);
        });
    });

    app.put('/places/:id', authenticator, function addPlace(req, res, next){
        if(!canEdit(req.user, req.params.id)) return res.status(HTTPStatus.FORBIDDEN).send('Cant Edit this place');
        var place = req.body;
        places.editPlace(place, function(err, place){
            if(err) return next(err);
            return res.status(HTTPStatus.OK).send(place);
        });
    });
};

module.exports = placesRoutes;


function canEdit(owner, placeId){
    return _.includes(owner.user.places, placeId);
}