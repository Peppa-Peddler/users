var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../models/user');

module.exports = function (passport) {
	passport.serializeUser(function(user, done) {
		console.log(user.id +" was seralized");
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
			console.log(id + "is deserialized");
			User.findById(id, function(err, user) {
					done(err, user);
			});
	});
	passport.use('local-signup', new LocalStrategy({
			usernameField		: 'username',
			passwordField		: 'password',
			passReqToCallback	: true
		},
		function (req, username, password, done) {
			process.nextTick(function() {

				User.findOne({ 'local.username': username }).exec( function (err,user){
					if (err) return done(err);
					if (user) {
						console.log('Username already taker D:');
						return done(null, false, req.flash('signupMessage', 'Username already taken D:'));
					} else {
						var newUser = new User();
						newUser.local.username = req.body.username;
						newUser.local.password = newUser.generateHash(req.body.password);
						newUser.local.tipo = req.body.tipo;
						newUser.save( function (err) {
							if (err) throw err;
							console.log("new user: " + newUser.local.username);
							return done(null);
						});
					}
				});
			});
		}));

	passport.use('local-login', new LocalStrategy({
			usernameField		: 'username',
			passwordField		: 'password',
			passReqToCallback : true
		},
		function (req, name, pass, done) {
			User.findOne({'local.username': name}).exec( function (err,user) {
				if (err) return done(err);
				if (!user) 
					return done(null, false, req.flash('loginMessage', 'No user found'));
				if (!user.validPass(pass))
					return done(null, false, req.flash('loginMessage', 'Wrong pass'));
				console.log('Authenticated');
				passport.authenticate();
				return done(null, user);
			});
		}));
}
