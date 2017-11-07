var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/*
This schema is written based on 'User Profile' info from http://passportjs.org/docs.
This represents a chess palyer
*/
var User = new Schema({
	email : {type:String,required:true, unique: true},
  name : {type : String, required : true, unique : true},
	photo : String,
  currentRating: {type:Number,default:800},
  totalMatch: {type:Number,default:0},
  win: {type:Number,default:0},
  lose: {type:Number,default:0},
  draw: {type:Number,default:0},
  tournament:{type:Number,default:0}
});

module.exports = mongoose.model('User',User);
