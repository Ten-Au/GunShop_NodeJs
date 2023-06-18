var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});

const AuthControlller = require('../controllers/authController');

router.post('/login', AuthControlller.login);
router.get('/logout', AuthControlller.logout);

module.exports = router;
