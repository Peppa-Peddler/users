var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST eliminates a task with tareaD_id as id_t. */
router.post('/', isLoggedInAdmin, function(req, res) {
	knex('tasks')
	.where('id_t',req.body.tareaD_id)
	.del().then(function(result) {
		console.log('Elminated task: '+ tareaD_id);
		req.flash('profileMessage', 'Deleted: '+tareaD_id);
	});
	res.redirect('/profile');
});

module.exports = router;

function isLoggedInAdmin (req,res,next) {
	if(req.isAuthenticated() && req.user.tipo == 0){
		return next();
	}
	res.redirect('/');
}
