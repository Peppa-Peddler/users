var knex = require('../db/connection');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	mensaje : String,
	date: {type : Date, default: Date.now}
},{_id : false});

var taskSchema = mongoose.Schema({
	title : {type: String, required: true},
	content : {type: String, required: true},
	status : {type: Boolean, default: false}
},{_id : false});

var userSchema = mongoose.Schema({
	
	local				:{
		username	: String,
		password	: String,
		tipo			: Number,
		messages	: [ messageSchema ],
		date : { type: Date, default: Date.now },
		tasks			: [ taskSchema ]
	}
	
});

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync( password,bcrypt.genSaltSync() );
};

userSchema.methods.validPass = function (password) {
	return bcrypt.compareSync( password, this.local.password )
};

module.exports = mongoose.model('User', userSchema);
