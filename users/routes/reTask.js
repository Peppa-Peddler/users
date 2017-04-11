var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');

/* POST eliminates a task with tareaD_id as id_t. */
router.post('/', isLoggedIn, function(req, res) {
	var datos = req.body.tareaD_id.split(",");
	console.log(datos);
	console.log(datos[1]);
	User.update({ 'local.tasks._id':mongoose.Types.ObjectId(datos[1]) },{$set: {'local.tasks.$.status':!(datos[2]== 'true')}}).exec(function(err,result) {
		console.log('New status for: ' + datos[1] + ",now it's: " + !(datos[2] == 'true') );
		console.log(result);
		res.redirect('./profile');
	});
});

module.exports = router;

function isLoggedIn (req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
