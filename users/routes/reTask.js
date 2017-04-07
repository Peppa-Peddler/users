var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST eliminates a task with tareaD_id as id_t. */
router.post('/', isLoggedIn, function(req, res) {
	knex('tasks')
	.select('status')
	.where('id_t',req.body.tareaD_id)
	.then(function(result) {
		console.log(resut);
		if (result.status == 0) {
			knex('tasks').update('status', '1');
		} else {
			knex('tasks').update('status', '0');
		}
	});
	res.redirect('/profile');
});

module.exports = router;

function isLoggedIn (req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
