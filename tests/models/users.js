var should = require('should');
var expect = require('chai').expect;
var db = require('../../model/users');

describe('Model User Tests', function() {

    before(function(done) {
        console.log("Borrando todos los documentos de la colección users...");
        db.findAll().then(function(users){
            users.forEach(user => {
                db.deleteById(user._id);
                console.log("Usuario " + user._id + " borrado");
            });
            done();
        });
    });

    beforeEach(function(done) {
        console.log("BeforeEach function...");
        done();
    });

    it('all', function(done) {
        db.save(buildMockUser(1)).then(function(){
        }).then(function(){
            return db.save(buildMockUser(2));
        }).then(function(){
            db.findAll().then(function(users){
                expect(users.length).to.equal(2);
                done();
            });
        })
    });

    var buildMockUser = function(userId){
        return {"_id": userId};
    };
});