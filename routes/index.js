var express = require('express');
const jwt=require('jsonwebtoken')
var router = express.Router();
const isValidToken= require('../middleware/isValidToken')
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) { 
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});



router.get('/profile', isValidToken, function(req, res, next) {
  // console.log("is there decoded data?", decoded)
  res.render('profile', 
  // {name: decoded.data} 
  );
});



module.exports = router;
