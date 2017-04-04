var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var user = require('../models/user');

module.exports = function (passport) {
	passport.serializeUser(function(user, done) {
		console.log(user.u_id +" was seralized");
		done(null, user.u_id);
	});

	passport.deserializeUser(function(id, done) {
			console.log(id + "is deserialized");
			User.findById(id, function(err, user) {
					done(err, user);
			});
	});
	passport.use('local-signup', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true
		},
		function ( req, username, password, done ) {
			process.nextTick (function () {
				User.findOne( username, function (err, isNotAvailable, user) {
					if (err)
						return done(err);
					if (user) {
						return done(err, false, req.flash('signupMessage', 'Username already taken D:'));
					}	else {
						console.log('New local user!');
						var user = new User();
						user.local.username = username;
							var salt = bcrypt.genSaltSync();
							var hash = bcrypt.hashSync(req.body.password,salt);
						user.local.password = hash;
						user.save(function (newUser) {
							console.log("new user: " +  newUser);
							return done(null);
						});
					}
				});
			});
		}));
	passport.use('local-login', new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback : true
		},
		function ( req,username, password, done) {
			User.validPass(username, password, function(err, passMatch, user) {
				if (!passMatch){
					return done(null, false, req.flash('loginMessage','Wrong credentials.'));
				}
				passport.authenticate();
				return done(null,user);
			});
	}));
}
