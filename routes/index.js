var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tournament', function(req, res, next) {
  res.render('tournament', { title: 'Express' });
});

module.exports = router;
