module.exports = {
    oneByEmail: function(email){
        return {
            query: {
                "match": {
                    "email": email
                }
            }
        }
    }
};