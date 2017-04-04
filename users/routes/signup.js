var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

router.get('/', function(req, res) {
	res.render('signup');
	console.log('rendered signup');
});
/* POST signup credentials. */
router.post('/', function(req,res,next) {
	passport.authenticate('local-signup', function(err,user,info){
		if(err) return next(err);
		if(user) console.log('Created succesfully');
	})(req,res,next);	
});

module.exports = router;
