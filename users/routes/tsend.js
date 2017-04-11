var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST send taks to employer. */
router.post('/', isLoggedInAdmin, function(req, res) {
	console.log('Trying to post a task');
	User.findByIdAndUpdate(req.body.empleado,{$push:{"local.tasks": {content:req.body.tarea, title: req.body.title}} }, {safe:true}).exec( function (err, result) {
		console.log(result);
		console.log(req.body.tarea);
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
