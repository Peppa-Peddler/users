var express = require('express');
var router = express.Router();
var knex = require('knex')({
	client : 'pg',
	connection : {
		host : 'localhost',
		port : '5432',
		user : 'hadas',
		password : 'hadas2017',
		database : 'hadas'
	}
});

/* POST login credentials. */
router.get('/', function(req, res) {
	res.send('Log in!');
});

module.exports = router;
