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
    },function(callback){
      Tournament.find({"status":"scheduled"},function(err,value){
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
      'tour' : results[4],
      'user' : req.locals
    }
    res.render('index',data);
  });
})

router.get('/tournament', function(req, res, next) {
  Tournament.find({},function(err,docs){
    if(err)next();
    res.render('tournament',{"TournamentData":docs, "user": req.locals});
  })
})

router.post('/addUserTournament', function(req, res, next) {
    var tid = req.body.id;
    console.log(tid);
    Tournament.findById(tid,function(err,doc){
      if(err){
        console.log(err);
        next();
      }
      var players = doc.players;
      if(doc.status =="scheduled"){
        var bool = false;
        for(var i=0;i<players.length;i++){
          if(players[i].email==req.locals.email){
              players.splice(i,1);
              console.log(players);
              doc.players = players;
              doc.save();
              bool = true;
              res.json("remove");
              break;
          }
        }
        if(!bool){
          players.push({"email":req.locals.email, "name":req.locals.name})
          doc.players = players;
          doc.save();
          res.json("added")
        }
      }else{
        res.json("invalid operation")
      }
    })
})

router.get('/user', function(req, res, next) {
  User.find({}, function(err,value){
      if(err)next();
      res.render('user',{"userdata" : value, "user": req.locals});
  })
})
// router.get("/addtournament",function(req,res,next){
//   var tournament = new Tournament();
//   tournament.id = 1;
//   tournament.name = "Nov Blitz";
//   tournament.date = "28'Nov,2017";
//   tournament.gameType = "Blitz(10min)";
//   tournament.status = "schedule";
//   tournament.location ="laska meeting room";
//   tournament.time = "19.00 PM to 21.00PM";
//   tournament.save();
//   res.json({"done":"done"});
// })
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
  var tourId = req.query.id;
  async.parallel([
    function(callback){
      Tournament.findById(tourId,function(err,doc){
        callback(err,doc);
      })
    },
    function(callback){
      History.find({"tourId":tourId},function(err,docs){
        callback(err,docs);
      });
    }
  ],function(err,results){
      var tournament = results[0];
      var history = results[1];
      var data = {
        'tournament' : tournament,
        'history' : history,
        'user': req.locals
      };
      res.render('matches',data);
  });
})

router.get('/play',function(req,res,next){
  res.render('play')
})

router.get('/logout',function(req,res,next){
  res.clearCookie("token");
  res.redirect('auth/login');
})
module.exports = router;
