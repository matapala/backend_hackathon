var express = require('express');
var router = express.Router();
var util=require('util');
var Trip = require('../models/trip');
var ObjectId = require('mongoose').Types.ObjectId;

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/gettrip', function(req,res,next){
	console.log(req.body.idtrip);
	console.log(req.body.idfb);
	var idtrip = req.body.idtrip;
	var idfb = req.body.idfb;
	//Trip.find({'idTrip': req.body.idtrip,'idFB':req.body.idfb}, function(err, trips){
	//Trip.find({'idTrip': idtrip}, function(err, trips){
	Trip.find({idFB: idfb,idTrip: idtrip}, function(err, trips){
		if(err)
			res.status(500).send(err);
		//console.log(trips);
		res.status(200).json(trips);
	});
});

router.get('/test', function(req,res,next){
	Trip.find({idFB: 1291573905}).sort({idTrip: -1}).limit(1)
	.then(function(result){
		console.log(result[0].idTrip);
    console.log(result[0].dateFormatted);
    res.send(result[0]);
	}).catch(function(err){
		console.log(err);
	});
});

router.post('/test', function(req,res,next){
	var t = new Trip();
	t.idFB=req.body.idfb;
	t.idTrip=req.body.idtrip;
	t.desc=req.body.desc;
	t.title=req.body.title;
	t.Lat=15.99;
	t.Lon=17.87;
	t.mediaName=req.body.mediaName;
	t.mediaDate= new Date().toLocaleString();
	t.save(function(err){
		if(err)
		res.status(500).send(err);
	res.status(200).end();
	});
});

router.post('/addmedia', function(req,res,next){
    pt = new Trip();
    pt.idFB = req.body.idFB;
    pt.mediaName = req.body.mediaName;
    pt.Lat = req.body.lat;
    pt.Lon = req.body.lon;
    pt.desc = req.body.desc;

    if(typeof(req.body.title) === 'undefined'){
      console.log('Just a new pointTrip');
      pt.idTrip = req.body.idTrip;
      res.status(201).send(pt);
    } else next();
  }, function(req,res,next){
      console.log('New trip');
      console.log('Checking if new idFB');
      Trip.find({idFB:req.body.idFB}).count()
      .then(function(count){
        if(count === 0){
          console.log('New idFB: First Trip');
          console.log('Setting idTrip to 1');
          pt.idTrip = 1
          next();
        } else {
          next();
        }
      }).catch(function(err){
        console.log(err);
        res.status(500).end();
      })
    },function(req,res,next){
      if(pt.idTrip === 1){
        next()
      } else {
        console.log('Getting next available idTrip');
        Trip.find({idFB: pt.idFB}).sort({idTrip: -1}).limit(1)
        .then(function(data){
          pt.idTrip = data[0].idTrip + 1;
          next();
        }
      )
      .catch(function(err){
        console.log(err);
        res.status(500).end();
      })
    }
    }, function(req,res,next){
      res.status(201).send(pt);
});

// router.post('/addmedia', function(req,res,next){
// 	//on cherche si c'est un trip --> title
// 	pt = new Trip();
// 	//console.log(req.body);
// 	pt.idFB = req.body.idfb;
// 	pt.mediaName = req.body.mediaName;
// 	pt.Lat = req.body.lat;
// 	pt.Lon = req.body.lon;
// 	pt.desc = req.body.desc;
// 	console.log('Title ' + req.body.title);
// 	if(req.body.title === undefined){
// 		console.log('Juste un pointTrip');
// 		pt.idTrip = req.body.idTrip;
// 		pt.save(function(err){
// 			if(err){
// 				res.status(500).end();
// 			}
// 			console.log(pt);
// 			res.status(200).send(pt);
// 		});
// 	} else {
// 		console.log('On cherche le max id');
// 		pt.title = req.body.title;
// 		console.log(pt);
// 		Trip.find({idFB: pt.idFB}).count()
// 		.then(function(count){
// 			console.log('count ' + count);
// 			if(count === 0) {
// 				console.log('count is null');
// 				pt.idTrip = 1;
// 				pt.save(function(err){
// 					if(err)
// 						res.status(500).send(err);
// 				});
// 				res.status(200).send(pt);
// 			} else {
// 				console.log('idFB existe');
// 				Trip.find({idFB: pt.idFB}).sort({idTrip: -1}).limit(1)
// 				.then(function(data){
// 					pt.idTrip = data[0].idTrip + 1;
// 					pt.save(function(err){
// 						if (err)
// 							res.status(500).send(err);
// 						res.status(200).send(pt);
// 					});
// 				}).catch(function(err){
// 					console.log(err);
// 					res.status(500).end();
// 				});
// 			}
// 		}).catch(function(err){
// 			res.status(500).send(err);
// 		});
// 	}
// });



router.get('/gettrip/:idfb/:idtrip', function(req,res,next){
	Trip.find({idTrip: req.params.idtrip, idFB: req.params.idfb}, function(err, result){
		if(err)
			res.status(500).end();
		//console.log(result);
		res.status(200).json(result);
	});
});
router.get('/getalltripbyidfb/:idfb', function(req,res,next){
	Trip.find({idFB:req.params.idfb,title:{$ne:null}}, function(err, result){
		if(err)
			res.status(500).end();
		res.status(200).json(result);
	});

});

router.get('/gettripbyidtrip/:id', function(req,res,next){

	Trip.findOne({_id: new ObjectId(req.params.id)})
	.then(function(data){
		Trip.find({idTrip: data.idTrip, idFB: data.idFB})
		.then(function(result){
			res.status(200).send(result);
		}).catch(function(err){
			res.status(500).send(err);
		});
	}).catch(function(err){
		res.status(500).send(err);
	});
});
module.exports = router;
