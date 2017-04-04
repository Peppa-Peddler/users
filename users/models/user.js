var knex = require('../db/connection');
var bcrypt = require('bcrypt');

function User() {
	this.id_p = 0;
	this.username = '';
	this.password = '';
	this.tipe = '';
	this.save = function (callback) {
		var username = this.username;
		knex('usuarios').inser([ {'username': this.username, 'password':this.password, 'tipo': this.tipo} ]).then(function (result) {
			console.log("Added: ",this.username);
		});
	};
}
User.findOne = function (name, callback){
	var isNotAvailable = false;
	knex('usuarios').where(username,name).then(function(result) {
		if (result.length > 0) {
			isNotAvailable = false;
		} else {
			isNotAvailable = true;
		}
		return callback(false, isNotAvailable, this);
	});
};
User.valisPass = function (name, pass, callback) {
	var passMatch = false;
	knex('usuarios').where(username,name).then(function(result) {
		if (result.length>0 && bcrypt.compareSync(password,result[0]['password']) ) {
			passMatch = true;
			var user = new User();
			user.id_p = result[0]['id_p'];
			user.username = result[0]['username'];
			user.password = result[0].['password'];
			user.tipo = result[0]['tipo'];
		} else {
			passMatch = false;
		}
		return callback(false, passMatch, user);
	});
};
User.show = function (callback) {
	knex.select().table('usuarios').then( function(result) {
		return callback(result);
	});
};
