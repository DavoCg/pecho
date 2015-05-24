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
    },
    randDescription: function(){
        return "I'm the default description"
    },
    randImage: function(){
        return 'http://yourlittleblackbook.vanons.netdna-cdn.com/wp-content/uploads/2014/10/moose-bangkok-ekkamai-11.jpg?2a99fe';
    }
};


function createPlace(){
    return {
        followed: chance.bool(),
        isOpen: chance.bool(),
        name: faker.randName(),
        tags: faker.randTags(2),
        location: faker.randLocation(),
        description: faker.randDescription(),
        imageURI: faker.randImage()
    }
}


module.exports = createPlace;