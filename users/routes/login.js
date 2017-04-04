var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.post('/', function(req, res, next) {
	passport.authenticate('local-login', function (err,user,info) {
		if (!user) {
			console.log('D:');
			return res.redirect('/');
		}
		req.logIn(user, function(err) {
			if (err) return next(err);
			console.log('Is it authenticated: '+req.isAuthenticated());
			console.log('redirecting to profile');
			return res.redirect('/profile');
		});
	})(req, res, next);
});

module.exports = router;
