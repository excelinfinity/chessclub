var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Matches = new Schema({
	tourId : {type : String, required:true},
	whitePlayer : String,
	blackPlayer :String,
	matchStatus : {type : Number, default : 0},
	whitePlayerR : Number,
	blackPlayerR : Number,
	result : {type:Number,default:0},
	whitePlayerRA : Number,
	blackPlayerRA : Number,
	resultUpdateTime : Date,
});

module.exports = mongoose.model('Matches',Matches);
