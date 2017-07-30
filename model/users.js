var db = require('./db');

module.exports.findById = function(id) {
    return db.mongoDatabaseConnectionPromise.then(function(db) {
            return db.collection('user').findOne({"_id": id});
        })
        .catch(function(err) {
            throw err;
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

module.exports.save = function(userDocument) {
    return db.mongoDatabaseConnectionPromise.then(function (db) {
        return db.collection('user').save(userDocument);
    });
};

module.exports.update = function(userDocument) {
    return db.mongoDatabaseConnectionPromise.then(function (db) {
        if(typeof(userDocument._id) == "undefined"){
            throw new Error("No se encuentra definido el atributo _id en el documento que intenta actualizar");
        }
        return db.collection('user').update({"_id": userDocument._id}, userDocument);
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
