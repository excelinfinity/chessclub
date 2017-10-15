var fs = require('fs');
var mongoose = require('mongoose');

//register all models sync

var models = fs.readdirSync('./models');

models.forEach(function(model){
	require('./models/'+model);
	console.log('model: '+ model + 'loaded')
});

//change url according to db listen url+port
var url = 'mongodb://127.0.0.1/chessdb'
var db = mongoose.connection;

mongoose.connect(url,{
  useMongoClient:true,
});

console.log('Connecting to DB.....');

var dbConnPromise = new Promise(function(reslv,rejct){
	db.on('error',function(err){
		console.log('DB:Connect Error..',err);
		rejct(err);
	});
	db.once('open',function(){
		console.log('DB:Connected Successfully.')
		reslv('Connected');
	});
});

module.exports = exports = dbConnPromise;
