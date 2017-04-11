var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

router.get('/', isLoggedInAdmin, function(req, res) {
	User.find( function (err,result) {
		res.render('signup', {
			empleados: result,
			message: req.flash('signupMessage')
		});
	});
	console.log('rendered signup');
});
/* POST signup credentials. */
router.post('/', isLoggedInAdmin, passport.authenticate('local-signup', {
	succesRedirect : '/signup',
	failureRedirect : '/signup',
	failureFlash : true
}));

module.exports = router;

function isLoggedInAdmin(req,res,next){
  if(req.isAuthenticated() && req.user.local.tipo == "0"){
  	console.log(req.user.local.tipo);
		console.log("authenticated as Admin!");
		return next();
  }
  res.redirect('/');
}
