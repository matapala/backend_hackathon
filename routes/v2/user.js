var express = require('express');
var router = express.Router();
var User = require('../../models/v2/user');

router.post('/', function(req,res,next){
  var user = new User();
  user.idFB = req.body.idFB;
  user.dataFB = req.body.dataFB;
  user.save().then(function(){
    res.status(201).send(user);
  }).catch(function(err){
    console.log(err);
    res.status(500).end();
  })
});

router.delete('/:idFB', function(req,res,next){
  User.findOne({idFB:req.params.idFB})
  .then(function(user){
    if(user){
      user.remove();
      console.log('User with idFB: '+req.params.idFB +' deleted');
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  }).catch(function(err){
    res.status(500).end();
  })
})

router.get('/:idFB',function(req,res,next){
  User.find({idFB:req.params.idFB},['idFB','dataFB'])
  .then(function(user){
    user ? res.status(200).send(user) : res.status(404).end() ;
  })
  .catch(function(err){
    console.log(err);
    res.status(500).end();
  })
})

module.exports = router;
