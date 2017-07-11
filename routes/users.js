var express = require('express');
var router = express.Router();
var users = require('../model/users');

router.get('/', function(req, res) {
    users.findAll().then(function(users){
        res.status(200).json(users);
    });
});

router.delete('/:id', function(req, res){
  users.deleteById(req.params.id).then(function(result){
    res.status(200).json(result);
  });
});

router.post('/', function(req, res){
    users.save(req.body).then(function(result){
        res.status(200).json(result);
    });
});

module.exports = router;
