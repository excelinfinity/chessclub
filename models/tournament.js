var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Tournament = new Schema({
  id : Number,
  name : String,
  date : Date,
  gameType : {type:String,default:"blitz"}
});

module.exports = mongoose.model('Tournament',Tournament);
