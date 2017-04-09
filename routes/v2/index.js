var express = require('express');
var router = express.Router();
var util=require('util');
var Album = require('../../models/v2/trip');
var User = require('../../models/v2/user');
var Media = require('../../models/v2/media');
var ObjectId = require('mongoose').Types.ObjectId;



router.delete('/album/:idFB/:idTrip', function(req,res,next){
  Album.findOne({idTrip:req.params.idTrip})
  .populate('user',null,{idFB:req.params.idFB})
  .then(function(album){
    if(album){
      album.remove().then(function(){
        console.log('Album(idTrip: '+req.params.idTrip+') deleted');
        res.status(204).end();
      }).catch(function(err){
        res.status(500).end();
      });
    } else {
      console.log('Album not found');
      res.status(404).end();
    }
  })
  .catch(function(err){
    res.status(500).end();
  })
})

router.post('/album/:idFB', function(req,res,next){
  var album = new Album();
  User.findOne({idFB:req.params.idFB})
  .then(function(user){
    if(user){
      album.title = req.body.title;
      album._user = user;
      album.save().then(function(){
        res.status(201).send(album);
      }).catch(function(err){
        console.log(err);
        res.status(500).end();
      });
    } else {
      console.log('User not found');
      res.status(404).end();
    }
  }).catch(function(err){
    console.log(err);
    res.status(500).end();
  });
});

router.get('/album/:idFB', function(req,res,next){
  Album.find(['title','idTrip'])
  .populate('user',['idFB','dataFB'])
  .then(function(album){
    album ? res.status(200).send(album) : res.status(404).end();
  }).catch(function(err){
    console.log(err);
    res.status(500).end();
  })
})

router.get('/album/:idFB/:idTrip', function(req,res,next){
  Album.findOne({idTrip:req.params.idTrip})
  .populate('user',['idFB','dataFB'])
  .then(function(album){
    album ? res.status(200).send(album) : res.status(404).end();
  })
  .catch(function(err){
    console.log(err);
    res.status(500).end();
  })
  // User.findOne({idFB:req.params.idFB})
  // .populate('trips', ['idTrip','title','media'], {idTrip: req.params.idTrip})
  // .then(function(user){
  //   res.status(200).send(user)
  // }).catch(function(err){
  //   console.log(err);
  //   res.status(500).end();
  // });
});

module.exports = router;
