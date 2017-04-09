var express = require('express');
var router = express.Router();
var Media = require('../../models/v2/media');


router.get('/',function(req,res,next){
  Media.find()
  .then(function(media){
    media ? res.status(200).send(media) : res.status(404).end();
  })
  .catch(function(err){
    console.log(err);
    res.status(500).end();
  })
})

//router.post('/')

module.exports = router;
