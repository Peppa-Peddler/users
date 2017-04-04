var knex = require('../db/connection');
var bcrypt = require('bcryptjs');

function User() {
	this.id_u = '';
	this.username = '';
	this.password = '';
	this.tipo = '1';
	this.save = function (callback) {
		var username = this.username;
		knex('usuarios').insert([ {'username': this.username, 'password':this.password, 'tipo': this.tipo} ]).then(function (result) {
			console.log("Added: ",username);
			var user = new User();
			user.username = this.username;
			user.password = this.password;
			user.tipo = this.tipo;
			return callback(user);
		});
	};
}
User.findOne = function (name, callback){
	var isNotAvailable = false;
	knex('usuarios').where('username',name).then(function(result) {
		if (result.length > 0) {
			isNotAvailable = true;
		} else {
			isNotAvailable = false;
		}
		return callback(false, isNotAvailable, this);
	});
};
User.findById = function(id, callback){
	knex('usuarios').where('id_u',id).then(function(result) {
		if(result.length>0){
			var user = new User();
			user.tipo = result[0]['tipo'];
			user.username = result[0]['username'];
			user.password = result[0]['password'];
			user.id_u = result[0]['id_u'];
			return callback(null,user);
		} else {
			return callback(null,null);
		}
	});
};

User.validPass = function (name, pass, callback) {
	var passMatch = false;
	knex('usuarios').where('username',name).then(function(result) {
		if (result.length>0 && bcrypt.compareSync(pass,result[0]['password']) ) {
			passMatch = true;
			var user = new User();
			user.id_u = result[0]['id_u'];
			user.username = result[0]['username'];
			user.password = result[0]['password'];
			user.tipo = result[0]['tipo'];
			console.log('Good Login');
		} else {
			passMatch = false;
			console.log('Bad Login');
		}
		console.log(result);
		return callback(false, passMatch, user);
	});
};
User.show = function (callback) {
	knex.select().table('usuarios').then( function(result) {
		return callback(result);
	});
};

module.exports = User;
