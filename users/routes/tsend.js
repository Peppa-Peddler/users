var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST send taks to employer. */
router.post('/', isLoggedIn, function(req, res) {
	knex('tasks').insert([ {'rec_id': req.body.empleado, 't_title': req.body.title, 't_content': req.body.tarea, 'status': '0'} ]).then(function(result){
		console.log(result);
		console.log(req.body.tarea);
	});
	res.redirect('/profile');
});

module.exports = router;

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated() && req.user.tipo == 0){
		return next();
	}
	res.redirect('/');
}
