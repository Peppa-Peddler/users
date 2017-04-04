var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.get('/', isLoggedIn, function(req, res) {
	req.logout();
	res.redirect('/');
	console.log('Logged Out'+req.isAuthenticated() );
});

module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
