var components = require('adotcomponents');
var HTTPStatus = require('http-status');
var _ = require('lodash');

module.exports = components.define({
    name: 'places',
    required: ['server', 'database', 'validator', 'queries', 'authentication'],
    init: function init(done){
        this.checker = this.validator.getValidator('places');
        this.q = this.queries.getQueries('places');

        this.server.addRoute('get', '/places', this.getPlaces);
        this.server.addRoute('get', '/places/:id', this.getPlace);
        return done();
    },

    /**
     * Get all places based on query conditions
     * @param req
     * @param res
     * @param next
     * @returns {Request}
     */

    getPlaces: function getPlaces(req, res, next){
        var isQueryValid = this.checker.all(req.query);
        if(!isQueryValid) return res.status(HTTPStatus.BAD_REQUEST).send('Wrong query');

        var params = {
            index: 'places',
            query: this.q.all(formatQuery(req.query))
        };

        this.database.get(params, function(err, places){
            if(err) return next(err);
            if(!places.length) return res.status(HTTPStatus.NOT_FOUND).send('Oups no results for your query');
            return res.status(HTTPStatus.OK).send(places);
        })
    },

    /**
     * Get One place based on place id
     * @param req
     * @param res
     * @param next
     * @returns {Request}
     */

    getPlace: function getPlace(req, res, next){
        var isQueryValid = this.checker.one(req.query);
        if(!isQueryValid) return res.status(HTTPStatus.BAD_REQUEST).send('Wrong query');

        var params = {
            index: 'places',
            query: this.q.one(req.params.id)
        };

        this.database.get(params, function(err, place){
            if(err) return next(err);
            if(!place) return res.status(HTTPStatus.NOT_FOUND).send('Oups Place not found');
            return res.status(HTTPStatus.OK).send(place);
        })
    }
});





function formatQuery(query){
    var result = {};
    _.assign(result, query, {tags: query.tags.split(',')});
    return result;
}