var mongoClient = require('mongodb').MongoClient;

module.exports.mongoDatabaseConnectionPromise = mongoClient.connect('mongodb://localhost:27017/development');
