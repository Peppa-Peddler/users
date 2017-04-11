var express = require('express');
var router = express.Router();
var knex = require('../db/connection');
var User = require('../models/user');

router.get('/', function(req, res) {
//	User.find({},{"local.username":1,"local.tasks":1}).exec(function(err,result){
	User.find({},{id:1,"local.username":1}).exec(function(err,result) {
		console.log(result);
		res.send('Showing query results in console!');
	});
});

module.exports = router;
