var _ = require('lodash');
var Chance = require('chance');
var chance = new Chance();

var availableTags = ['poulet', 'riz', 'grec', 'kebab', 'sushis', 'pizza', 'burger', 'jambon', 'indien'];


var faker = {
    randName: function(){
        return chance.name();
    },
    randLocation: function(){
        var lat = chance.latitude({min: 48.81, max: 48.90, fixed: 6});
        var lon = chance.longitude({min: 2.26, max: 2.41, fixed: 6});
        return [lat, lon]
    },
    randTags: function(nb){
        return _.sample(availableTags, nb);
    }
};


function createPlace(){
    return {
        name: faker.randName(),
        tags: faker.randTags(2),
        location: faker.randLocation()
    }
}


module.exports = createPlace;