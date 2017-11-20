var mongoose = require('mongoose'),
  express = require('express')
  User = mongoose.model('User'),
  History = mongoose.model('History')
  router = express.Router();
var async = require('async');

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
  async.parallel([
    function(callback){
      User.find({email:req.locals.email},function(err,docs){
        callback(err,docs[0]);
      })
    },
    function(callback){
      History.find({email:req.locals.email},function(err,docs){
        callback(err,docs);
      });
    }
  ],function(err,results){
      console.log(results);
      var user = results[0];
      var history = results[1];
      var data = {
        'user' : user,
        'history' : history
      };
      res.render('userprofile',data);
  });
  // User.find({email:req.locals.email},function(err,docs){
  //   if(err){
  //     console.log("error getting user detail");
  //     next();
  //   }
  //   if(docs){
  //     console.log(docs[0]);
  //     var user = docs[0];
  //     res.render('userprofile',user);
  //   }
  // });
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
