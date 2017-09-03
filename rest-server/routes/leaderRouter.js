var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();
var mongoose=require('mongoose');

var leaders= require('../models/leadership');

leaderRouter.use(bodyParser.json());

var url='mongodb://localhost:27017';
mongoose.connect(url);

leaderRouter.route('/')

    .get(function (req, res, next) {
       
	leaders.find({},function(err,leadership) {
		if(err) throw err;
		res.json(leadership);
	});  
	   
    })

    .post(function (req, res, next) {
       // res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
      leaders.create(req.body,function(err,lead) {
		if(err) throw err;
		
		console.log('Leader created');
		
		var id=lead._id;
		
		res.writeHead(200, {
		'Content-Type':'text/plain'});
		
		res.end('Added the leader with id: ' + id );
		
	}); 
	})

    .delete(function (req, res, next) {
        //res.end('Deleting all leaders');
		leaders.remove({},function(err,resp) {
			if(err) throw err;
			res.json(resp);
		});
    });

leaderRouter.route('/:leaderId')

    .get(function (req, res, next) {
        //res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
      
	  leaders.findById(req.params.leaderId,function(err,leadership) {
		  if(err) throw err;
		  res.json(leadership);
		  
	  });
	
	})

    .put(function (req, res, next) {
       // res.write('Updating the leader: ' + req.params.leaderId + '\n');
			leaders.findByIdAndUpdate(req.params.leaderId,
			{$set: req.body},{ new : true},
			function(err,leadership) {
		          if(err) throw err;		
				res.json(leadership);
			});
			
    })

    .delete(function (req, res, next) {
        //res.end('Deleting leader: ' + req.params.leaderId);
		leaders.findByIdAndRemove(req.params.leaderId, function(err,resp) {
			if(err) throw err;
			
			res.json(resp);
			
		});
    })

module.exports = leaderRouter;