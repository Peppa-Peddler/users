var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.get('/', isLoggedIn, function(req, res) {
	if (req.user.tipo == 0) {
		var mensajes;
		knex('usuarios').join('buzon', 'usuarios.id_u', '=', 'buzon.rem_id')
		.select('username','mensaje')
		.orderBy('id_m','asc').then( function(result) {
			mensajes = result;
			return knex('usuarios').join('tasks', 'usuarios.id_u', '=', 'tasks.rec_id').select('username','t_title','t_content','status').orderBy('id_t','asc')
		}).then( function(result2) {
			res.render('profile', {
				user: req.user,
				mensajes: mensajes,
				tareas: result2
			});
		});
	} else {
		var mensajes;
		knex('usuarios').join('buzon', 'usuarios.id_u', '=', 'buzon.rem_id')
		.select('username','mensaje')
		.orderBy('id_m','asc').then( function(result) {
			mensajes = result;
			return knex('usuarios').join('tasks', 'usuarios.id_u', '=', 'tasks.rec_id').select('username','t_title','t_content','status').where('username', req.user.username).orderBy('id_t','asc')
		}).then( function(result2) {
			res.render('profile', {
				user: req.user,
				mensajes: mensajes,
				tareas: result2
			});
		});
	}
});

module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
