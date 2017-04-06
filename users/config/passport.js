var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../models/user');

module.exports = function (passport) {
	passport.serializeUser(function(user, done) {
		console.log(user.id_u +" was seralized");
		done(null, user.id_u);
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
			process.nextTick (function (callback) {
				User.findOne( username, function (err, isNotAvailable, user) {
					if (err)	return done(err);
					if (isNotAvailable == true) {
						console.log('username not available');
						return done(err, false, req.flash('signupMessage', 'Username already taken D:'));	
					}	else {
						console.log('New local user!');
						var user = new User();
						user.username = req.body.username;
							var salt = bcrypt.genSaltSync();
							var hash = bcrypt.hashSync(req.body.password,salt);
						user.password = hash;
						user.tipo = req.body.tipo;
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
		function ( req, name, pass, done) {
			User.validPass( name, pass, function(err, passMatch, user) {
				if (!passMatch){
					return done(null, false, req.flash('loginMessage','Wrong credentials.'));
//					return done(null, false );
				}
				passport.authenticate();
				console.log('authenticated!');
				return done(null,user);
			});
	}));
}
