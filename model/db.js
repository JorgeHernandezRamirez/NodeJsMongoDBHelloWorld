var Promise = require('bluebird');
var mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

module.exports.mongoDatabaseConnectionPromise = mongoClient.connect('mongodb://localhost:27017/development');
