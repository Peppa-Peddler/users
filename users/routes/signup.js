var express = require('express');
var router = express.Router();
var knex = require('../db/connection');

router.get('/', function(req, res) {
	res.render('signup');
	console.log('rendered signup');
});
/* POST signup credentials. */
router.post('/', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash; true
}));

module.exports = router;
