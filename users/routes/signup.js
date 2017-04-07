var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

router.get('/',isLoggedInAdmin, function(req, res) {
	knex('usuarios').select('id_u','username','tipo').then (function (result) {
		res.render('signup', {
			empleados: result,
			message: req.flash('signupMessage')
		});
		console.log(result);
	});
	console.log('rendered signup');
});
/* POST signup credentials. */
router.post('/', isLoggedInAdmin,	passport.authenticate('local-signup', {
	succesRedirect : '/signup',
	failureRedirect : '/signup',
	failureFlash : true
}));

module.exports = router;

function isLoggedInAdmin(req,res,next){
   console.log(req.user.tipo);
  if(req.isAuthenticated() && req.user.tipo == "0"){
		return next();
  }
  res.redirect('/');
}
