var mongoose = require('mongoose'),
  express = require('express')
  User = mongoose.model('User'),
  History = mongoose.model('History'),
  Tournament = mongoose.model('Tournament'),
  Matches = mongoose.model('Matches'),
  router = express.Router();
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel([
    function(callback){
      Tournament.count({},function(err,doc){
        callback(err,doc);
      })
    },
    function(callback){
      Matches.count({},function(err,doc){
        callback(err,doc);
      })
    },function(callback){
      User.count({},function(err,doc){
        callback(err,doc);
      })
    },function(callback){
      User.find({}).sort('currentRating').exec(function(err,value){
          callback(err,value);
      })
    }
  ],
  function(err,results){
    var data = {
      'totalTour' : results[0],
      'totalMatch' : results[1],
      'totalUser' : results[2],
      'userlist' : results[3],
      'user' : req.locals
    }
    res.render('index',data);
  });
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
