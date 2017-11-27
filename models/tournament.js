var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Tournament = new Schema({
  id : Number,
  name : String,
  date : String,
  gameType : {type:String,default:"blitz"},
	status : {type:String,default:"schedule"},
	location : {type:String,default:"laska meeting room"},
	time : {type:String,default:"laska meeting room"},
	players : [{
		email : {type:String,required:true}
	}]
});

module.exports = mongoose.model('Tournament',Tournament);
