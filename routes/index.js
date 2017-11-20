var mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.locals;
  console.log(user);
  res.render('index',user);
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

router.get('/matches',function(req,res,next){
  res.render('matches')
})

router.get('/play',function(req,res,next){
  res.render('play')
})

router.get('/logout',function(req,res,next){
  res.clearCookie("token");
  res.redirect('auth/login');
})
module.exports = router;
