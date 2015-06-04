var _ = require('lodash');

function formatSearch(response){
    return _.map(response.hits.hits, function(entry){
        return _.assign(entry._source, {id: entry._id});
    })
}

module.exports = {
    formatSearch: formatSearch
};