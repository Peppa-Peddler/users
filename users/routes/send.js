var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST message. */
router.post('/', isLoggedIn, function(req, res) {
	console.log('Sending a message');
	User.findByIdAndUpdate(req.user._id,{$push:{"local.messages": {mensaje:req.body.mensaje}} }, {safe:true}).exec( function (err, result) {
		console.log(req.body.mensaje);
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
