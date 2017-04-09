var express = require('express');
var router = express.Router();
var Album = require('../../models/v2/trip');
var User = require('../../models/v2/user');


router.use(function(req,res,next){req.albums = {};next();})

router.delete('/:idFB/:idTrip', function(req,res,next){
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

router.post('/:idFB', function(req,res,next){
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

router.get('/:idFB', userFound, function(req,res,next){
  if(req.albums.user){
    Album.find({_user:req.albums.user._id},['title','idTrip'])
    // .populate('_user')
    // .populate({path:'idFB', match: /req.params.idFB/, select: 'text', model: 'User'})
    .then(function(album){
      album ? res.status(200).send(album) : res.status(404).end();
    }).catch(function(err){
      console.log(err);
      res.status(500).end();
    })
  } else{
    res.status(404).end();
  }
})

router.get('/:idFB/:idTrip', userFound, function(req,res){
  if(req.albums.user){
    console.log('User with idFB: '+req.params.idFB+' found');
    console.log('Searching albums');
    Album.findOne({idTrip:req.params.idTrip,_user:req.albums.user._id})
    .then(function(album){
      album ? res.status(200).send(album) : res.status(404).end();
    })
    .catch(function(err){
      console.log(err);
      res.status(500).end();
    });
  } else {
    res.status(404).end();
  }
});

function userFound(req,res,next){
  User.findOne({idFB:req.params.idFB})
  .then(function(user){
    req.albums.user = user;
    next();
  })
  .catch(function(err){
    res.status(500).end();
  });
}

module.exports = router;
