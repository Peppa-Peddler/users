var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');
var passport = require('passport');

/* POST login credentials. */
router.get('/', isLoggedIn, function(req, res) {
	if (req.user.tipo == 0) {
		var mensajes;
		var tareas;
		knex('usuarios').join('buzon', 'usuarios.id_u', '=', 'buzon.rem_id')
		.select('username','mensaje')
		.orderBy('id_m','asc')
		.then( function(result) {
			mensajes = result;
			return knex('usuarios').join('tasks', 'usuarios.id_u', '=', 'tasks.rec_id')
				.select('id_t','username','t_title','t_content','status')
				.orderBy('id_t','asc')
		}).then( function(result2) {
			tareas = result2;
			console.log(tareas);
			return knex('usuarios').select('id_u','username')
		}).then( function(result3) {
			res.render('profile', {
				user: req.user,
				mensajes: mensajes,
				empleados: result3,
				tareas: tareas,
				message: req.flash('profileMessage')
			});
		});
	} else {
		var mensajes;
		var tareas;
		knex('usuarios').join('buzon', 'usuarios.id_u', '=', 'buzon.rem_id')
		.select('username','mensaje')
		.orderBy('id_m','asc')
		.then( function(result) {
			mensajes = result;
			return knex('usuarios').join('tasks', 'usuarios.id_u', '=', 'tasks.rec_id')
				.select('id_t','username','t_title','t_content','status')
				.where('username', req.user.username)
				.andWhere('status', "0").orderBy('id_t','asc')
		}).then( function(result2) {
			tareas = result2;
			res.render('profile', {
				user: req.user,
				mensajes: mensajes,
				empleados: "0",
				tareas: tareas,
				message: req.flash('profileMessage')
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
