var logger = require('winston')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
// var idvalidator = require('mongoose-id-validator');
var schemes = require('./schemes')

function Init() {

    // schemas.Scenario.plugin(idvalidator, { allowDuplicates: true });
    // schemas.Test.plugin(idvalidator, { allowDuplicates: true });
    // schemas.Execution.plugin(idvalidator);
    // schemas.Result.plugin(idvalidator, { allowDuplicates: true });


    // schemas.Account.plugin(passportLocalMongoose);


    mongoose.model('Poll', schemes.poll_scheme);


    let mongo_uri = process.env.MONGO_URI
  


    mongoose.Promise = global.Promise;

    var promise = mongoose.connect(mongo_uri, {
        useMongoClient: true
    });
    promise.then(function (db) {
        logger.info('Using mongo connection: ', mongo_uri)
        logger.info('Db connected')
    });


    return mongo_uri
}

module.exports = Init
