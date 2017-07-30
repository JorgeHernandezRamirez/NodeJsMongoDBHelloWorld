var should = require('should');
var expect = require('chai').expect;
var db = require('../../model/users');

describe('Model User Tests', function() {

    before(function(done) {
        console.log("Borrando todos los documentos de la colección users...");
        deleteUsers().then(function(){
            return insertUsers();
        }).then(function(){
            done();
        });
    });

    var deleteUsers = function(){
        return new Promise((resolve, reject) => {
            db.findAll().then(function(users){
                users.forEach(user => {
                    db.deleteById(user._id);
                    console.log("Usuario " + user._id + " borrado");
                });
                resolve();
            });
        });

    };

    var insertUsers = function(){
        return db.save(buildMockUser(1)).then(function(){
            return db.save(buildMockUser(2));
        }).then(function() {
            return db.save(buildMockUser(10));
        });
    };

    beforeEach(function(done) {
        console.log("BeforeEach function...");
        done();
    });

    it('shouldSaveTwoUsersAndExceptThreeElements', function(done) {
        db.findAll().then(function(users){
            expect(users.length).to.equal(3);
            done();
        });
    });

    it('shouldSaveOneUsersUpdatedItAndExcept1Element', function(done) {
        db.save(buildMockUser(10)).then(function(){
        }).then(function(){
            return db.update(buildMockUser(10, "Jorge"));
        }).then(function(commandResult){
            console.log("El resultado de actualizar el usuario es: " + commandResult.result);
            return db.findById(10);
        }).then(function(user){
            expect(user.name).to.equal("Jorge")
            done();
        });
    });

    it('shouldUpdateOneUsersNotExisted', function(done) {
        db.update({"name": "Jorge"}).then(function(user){
            should.fail("Debe fallar ya que no debió actualizarse correctamente")
        }).catch(function(err){
            console.log("El error fue " + err);
            done();
        })
    });

    var buildMockUser = function(userId){
        return {"_id": userId};
    };

    var buildMockUser = function(userId, name){
        return {"_id": userId, "name": name};
    };
});