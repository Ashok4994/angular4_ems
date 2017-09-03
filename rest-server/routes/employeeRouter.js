var express = require('express');
var bodyParser = require('body-parser');

var mongoose=require('mongoose');

var Employee =require('../models/employee');


var url='mongodb://localhost:27017';
mongoose.connect(url);

var employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

employeeRouter.route('/')
    .get(function (req, res, next) {
        Employee.find({},function(err,emp) {
		if(err) throw err;
		res.json(emp);

	});
	})

    .post(function (req, res, next) {
       // res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
       console.log('inside post function');
       var newEmployee = req.body;
       console.log(newEmployee);
      // var emp = new Employee
       Employee.create(req.body,function(err,emp) {
		if(err) throw err;

		console.log('Employee created');

		var id=emp._id;
    res.json(emp);
		// res.writeHead(200, {
		// 'Content-Type':'text/plain'});
    //
		// res.end('Added the employee with id: ' + id );

	});

	})


    .delete(function (req, res, next) {
        //res.end('Deleting all dishes');
        Employee.remove({},function(err,emp) {
		if(err) throw err;

		res.json(emp);

	});
	});

employeeRouter.route('/:empId')
.put(function (req, res, next) {
  console.log('inside put');
 console.log(req.body);
 Employee.findByIdAndUpdate(req.params.empId,{
 $set: req.body
 }, { new: true}, function(err,emp) {

   if(err) throw err;
   res.json(emp);
 });
 })

 .delete(function(req,res,next) {
   console.log('inside delete function');
   Employee.remove({_id:req.params.empId},function(err,resp) {
     if(err) throw err;
     console.log(resp);
     res.json(resp);
     console.log('delete completed');
   });
 });

module.exports = employeeRouter;
