var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.get('/', isLoggedIn, function(req, res) {
	var sub = knex('usuarios').where( {})
	knex('usuarios').join('buzon', 'usuarios.id_u', '=', 'buzon.rem_id').select('username','mensaje').orderBy('id_m','asc').then( function(result) {
		res.render('profile', {
			user: req.user,
			mensajes: result
		});
	});
});

module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
