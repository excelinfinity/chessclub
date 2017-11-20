var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var History = new Schema({
	tourId : {type : String, required:true},
	tourName : {type : String, required:true},
	matchId : {type : String, required:true},
	meemail : String,
	me : String,
	mycolor : String, //black & white
	opponent :String,
	matchStatus : {type:Number,default:0},
	mer : Number,
	or : Number,
	result : {type:Number,default:0},
	merA : Number,
	orA : Number,
	resultUpdateTime : Date,
});

module.exports = mongoose.model('History',History);
