var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./db");

var index = require('./routes/index');
var auth  = require('./routes/auth');
var jwt = require('jsonwebtoken');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(logger('dev'));
function checkLogin(req,res,next){
  var cookie = req.cookies;
  if(cookie && cookie.token){
    jwt.verify(cookie.token, 'someReallySecret', function(err, decoded) {
        if(err){next()}
        res.redirect('/');
    });
  }
  next();
}

function isLogin(req,res,next){
  var cookie = req.cookies;
  if(cookie && cookie.token){
    jwt.verify(cookie.token, 'someReallySecret', function(err, decoded) {
        if(err){res.redirect('auth/login')}
         req.locals = {};
         req.locals.name = decoded.name;
         req.locals.email = decoded.email;
        next();
    });
  }else{
    res.redirect('auth/login');
  }
}

app.use('/auth',checkLogin,auth)
app.use('/',isLogin,index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
