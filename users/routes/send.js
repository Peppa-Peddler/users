var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.post('/', isLoggedIn, function(req, res) {
	knex('buzon').insert([ {'rem_id': req.user.id_u, 'mensaje': req.param('mensaje')} ]).then(function(result){
		console.log(result);
		console.log(req.date);
		console.log(req.param('mensaje'));
	});
	res.redirect('/profile');
});

module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
