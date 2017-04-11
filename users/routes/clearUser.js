var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST clear user account. */
router.post('/', isLoggedInAdmin, function(req, res) {
	if (req.body.user_id != "58ec0b8f68be5a12c30da409") {
		User.remove({"local.username":req.body.user_name}).exec(function (err, result) {
			console.log('Removed: ' + req.body.user_name);
			res.redirect('/signup');
		});
	} else {
		console.log(req.body.user_id);
	}
});

module.exports = router;

function isLoggedInAdmin(req,res,next){
	if(req.isAuthenticated() && req.user.local.tipo == "0" ){
		console.log("authenticated as Admin!");
		return next();
	}
	res.redirect('/');
}
