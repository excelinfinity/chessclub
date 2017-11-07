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

router.get('/matches',function(req,res,next){
  res.render('matches')
})

router.get('/play',function(req,res,next){
  res.render('play')
})

router.get('/register',function(req,res,next){
  var userobj = {
    name :'',
    email:'',
    nameerr:'',
    emailerr:'',
    passworderr:'',
    passterr:''
  };
  res.render('register',userobj)
})

router.post('/register',function(req,res,next){
  var userobj = {};
  var a = false;
  userobj.name = req.body.name;
  userobj.email = req.body.email;
  userobj.password = req.body.password;
  userobj.password2 = req.body.password2;
  if(userobj.name.length < 6){
    userobj.nameerr = 'full name must be atleast 6 charecters';
    a = true;
  }
  if(userobj.email=='' || userobj.email.indexOf("@worksap.co.jp")== -1){
    userobj.emailerr = 'please use company email address';
    a = true;
  }
  if(userobj.password < 8){
    userobj.passworderr = 'please choose password of min 8 charecters';
    a = true;
  }
  if(userobj.password != userobj.password2){
    userobj.passterr = 'password doesnot match';
    a = true;
  }
  if(a){
    console.log(userobj);
    res.render('register',userobj);
  }else{
    
    //create session
    //redirect to new page.
  }

})
module.exports = router;
