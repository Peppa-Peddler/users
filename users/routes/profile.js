var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.get('/', isLoggedIn, function(req, res) {
	var mensajes;
	var tareas;
	User.find({'local.messages': {$exists:true,$ne:[]}},{"local.username":1,"local.messages":1}).exec(function (err,result) {
		mensajes = result;
		console.log("Mensajes: "+ mensajes);
		if (req.user.local.tipo == 0) {
			User.find({"local.tasks": {$exists:true,$ne:[]} },{"local.username":1,"local.tasks":1}).exec(function (err, result2) {
				tareas = result2;
				console.log("Tareas: "+tareas);
				User.find({},{id:1 , "local.username": 1}).exec(function (err, result3) {
					res.render('profile', {
						user: req.user,
						mensajes: mensajes,
						tareas: tareas,
						empleados: result3,
						message: req.flash('profileMessage')
					});
					console.log("empleados: "+result3);
				});
			});
		} else{
			User.find({"local.username":req.user.local.username, "local.tasks":{$ne:null}},{"local.tasks":1}).exec(function (err, result2) {
				tareas = result2;
				console.log("tareas: "+tareas);
				res.render('profile', {
					user: req.user,
					mensajes: mensajes,
					tareas: tareas,
					empleados: "0",
					message: req.flash('profileMessage')
				});
			});
		}
	});
});

module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
