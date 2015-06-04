var _ = require('lodash');
var validator = require('validator');

var requiredFields = {
    owner: ['email', 'password']
};

module.exports = {
    add: function(body){
        return (body.email
                && !isEmpty(body.email)
                && validator.isEmail(body.email)
                && body.password
                && !isEmpty(body.password))
    }
};


function isEmpty(x){
    return validator.isNull(x);
}
