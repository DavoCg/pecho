var expect = require('chai').expect;

var requestFormatter = require('../modules/request-formatter-stream');
var queries = require('./fixtures/request-formatter-queries');

describe('Request-formatter-stream', function(){
    it('Expect to pop an error if missing key', function(done){
       var requestFormatterStream = new requestFormatter();
       requestFormatterStream.on('error', done.bind(null, null));
       requestFormatterStream.write(queries.missingKey);
    });

    it('Expect to pop an error if empty key', function(done){
        var requestFormatterStream = new requestFormatter();
        requestFormatterStream.on('error', done.bind(null, null));
        requestFormatterStream.write(queries.emptyKey);
    });

    it('Expect to be well formatted for the next stream', function(done){
        var requestFormatterStream = new requestFormatter();
        requestFormatterStream.on('data', checkQuery.bind(null, done));
        requestFormatterStream.write(queries.valid);

        function checkQuery(cb, data){
            expect(data.hashtags).to.be.instanceof(Array);
            expect(data).to.contains.keys('hashtags', 'lat', 'lon', 'distance');
            expect(data.hashtags).not.to.be.empty;
            cb();
        }
    });
});

