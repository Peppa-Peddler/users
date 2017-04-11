var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');

/* POST eliminates a task with tareaD_id as id_t. */
router.post('/', isLoggedInAdmin, function(req, res) {
	var datos = req.body.tareaD_id.split(",");
	User.findByIdAndUpdate( datos[0] ,{$pull: {'local.tasks':{ _id : mongoose.Types.ObjectId(datos[1])} }}).exec(function(err,result) {
		console.log(result);
		console.log('Elminated task: '+ datos[1]);
		req.flash('profileMessage', 'Deleted: '+ datos[1]);
	});
	res.redirect('/profile');
});

module.exports = router;

function isLoggedInAdmin (req,res,next) {
	if(req.isAuthenticated() && req.user.local.tipo == 0){
		return next();
	}
	res.redirect('/');
}
