module.exports = {
    all: function(q){
        return {
            size: 200,
            query: {
                filtered: {
                    filter: {
                        geo_distance: {
                            distance: (q.distance / 1000) + 'km',
                            location: [+q.lat, +q.lon]
                        }
                    },
                    query: {
                        bool : {
                            must : {
                                terms : { "tags" : q.tags, minimum_should_match : 1}
                            }
                        }
                    }
                }
            }
        }
    },
    one: function(id){
        return {
            query: {
                "match": {
                    "_id": id
                }
            }
        }
    }
};