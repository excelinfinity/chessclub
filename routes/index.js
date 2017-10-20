var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/tournament', function(req, res, next) {
  res.render('tournament');
})

router.get('/user', function(req, res, next) {
  res.render('user');
})

router.get('/userprofile',function(req,res,next){
  res.render('userprofile')
})

router.get('/matches:id',function(req,res,next){
  res.render('mathces')
})

module.exports = router;
