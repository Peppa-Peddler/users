var express = require('express');
var router = express.Router();
var knex = require('../db/connection');

router.get('/', function(req, res) {
	knex.select().from('usuarios').then(function(result){
		console.log(result);
		res.send('Showing query results in console!');
	})
});

module.exports = router;
