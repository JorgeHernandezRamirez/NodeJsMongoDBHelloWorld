var db = require('./db');

module.exports.save = function(userDocument) {
    return db.mongoDatabaseConnectionPromise.then(function (db) {
        return db.collection('user').save(userDocument);
    });
};

module.exports.findAll = function() {
    return db.mongoDatabaseConnectionPromise.then(function(db) {
            return db.collection('user').find().toArray();
        })
        .catch(function(err) {
            throw err;
        });
};

module.exports.deleteById = function(id) {
    return db.mongoDatabaseConnectionPromise
        .then(function(db) {
            return db.collection('user').remove({"_id": id.toString()});
        })
        .catch(function(err) {
            throw err;
        });
};

module.exports.dropCollection = function() {
    return db.mongoDatabaseConnectionPromise
        .then(function(db) {
            return db.collection('user').dropDatabase();
        })
        .catch(function(err) {
            throw err;
        });
};
