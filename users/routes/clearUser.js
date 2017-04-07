var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST clear user account. */
router.post('/', isLoggedInAdmin, function(req, res) {
	if (req.body.user_id != "12") {
		knex('buzon')
		.where('rem_id', req.body.user_id)
		.del()
		.then(function() {
			return knex('tasks')
				.where('rec_id', req.body.user_id)
				.del()
		}).then( function() {
			return knex('usuarios')
				.where('id_u', req.body.user_id)
				.del()
		}).then( function() {
			res.redirect('/signup');
		});
	}
});

module.exports = router;

function isLoggedInAdmin(req,res,next){
	if(req.isAuthenticated() && req.user.tipo == "0" ){
		return next();
	}
	res.redirect('/');
}
