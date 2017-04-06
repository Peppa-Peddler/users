var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
		res.redirect('/profile');
	}
	res.render('index', { title: 'Admin LogIn', message: req.flash('loginMessage') });
});

module.exports = router;
