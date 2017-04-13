var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');
var schedule = require('node-schedule');
var mongoose = require('mongoose');

/* POST send taks to employer. */
router.post('/', isLoggedInAdmin, function(req, res) {
	console.log('Trying to post a task');
	var todate = new Date(req.body.limite + "T"+req.body.hora+"Z").getTime();
	var dia = todate +  5*60*60*1000;
	todate = new Date(dia).toUTCString();
	User.findByIdAndUpdate(req.body.empleado,
	{$push:{"local.tasks": {content:req.body.tarea, title: req.body.title, limit: dia}} }, {safe:true,new:true})
	.exec( function (err, result) {
		console.log(todate);
		var j = schedule.scheduleJob(new Date(todate) + 1000*60*60*5,function (){
			console.log("late for: " + req.body.empleado);
			User.update({"local.tasks.limit":todate},{$set: {"local.tasks.$.late":true}}).exec(function (err,result) {
				console.log(result);
			});
		});
		console.log(result);
	});
	res.redirect('/profile');
});

module.exports = router;

function isLoggedInAdmin (req,res,next) {
	if(req.isAuthenticated() && req.user.local.tipo == 0){
		return next();
	}
	res.redirect('/');
}
