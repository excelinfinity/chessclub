var bcrypt = require('bcrypt'),
  mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router(),
	User = mongoose.model('User'),
  Userauth = mongoose.model('Userauth'),
  jwt = require('jsonwebtoken');

const saltRounds = 10;
/* GET home page. */

router.get('/register',function(req,res,next){
  var userobj = {
    name :'',
    email:'',
    nameerr:'',
    emailerr:'',
    passworderr:'',
    passterr:'',
    already:''
  };
  res.render('register',userobj)
})

router.post('/register',function(req,res,next){
  var userobj = {};
  var a = false;
  userobj.already='';
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
    res.render('register',userobj);
  }else{
    var auth = new Userauth();
    var user = new User();
    auth.email = userobj.email;
    user.email = userobj.email;
    auth.name = userobj.name;
    user.name = userobj.name;
    //use bule bird later
    Userauth.find({email : auth.email},function(err,docs){
      console.log(docs);
      if(docs.length!=0){
        userobj.already = 'email address already registed';
        console.log('email alreay register');
        res.render('register',userobj);
      }else{
        bcrypt.hash(userobj.password, saltRounds, function(err, hash) {
          if(err){
            console.log("err during password hash");
            res.render('error',{err});
            next();
          }
          auth.password = hash;
          auth.save();
          user.save();
          var token =jwt.sign({
              email: auth.email,
              name: auth.name,
              type: '0'
          }, 'someReallySecret', { expiresIn: '30d' });
          res.cookie('token',token, { maxAge: 7000*60*60, httpOnly: true })
          res.redirect('/');
        });
      }
    })
  }
});


router.get('/login',function(req,res,next){
  userobj ={};
  userobj.email = '';
  userobj.pass = '';
  userobj.error = '';
  res.render('login');
});


router.post('/login',function(req,res,next){
  userobj ={};
  userobj.email = req.body.email;
  userobj.pass = req.body.pass;
  userobj.error = '';
  Userauth.find({email:userobj.email},function(err,docs){
    if(docs.length!=0){
     var hashpass = docs[0].password;
     bcrypt.compare(userobj.pass, hashpass, function(err, istrue) {
       if(istrue){
         var token =jwt.sign({
             email: userobj.email,
             name: docs[0].name,
             type: '0'
         }, 'someReallySecret', { expiresIn: '30d' });
         res.cookie('token',token, { maxAge: 7000*60*60, httpOnly: true })
         res.redirect('/');
       }else{
         userobj.pass = '';
         userobj.error ='user id or password is incorrect!!';
         res.render('login',userobj);
       }
     });
    }else{
      userobj.pass = '';
      userobj.error ='user id or password is incorrect!!';
      res.render('login',userobj);
    }
  });
});

module.exports = router;
