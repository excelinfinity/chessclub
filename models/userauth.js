var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/*
This schema is written based on 'User Profile' info from http://passportjs.org/docs.
This represents a chess palyer
*/
var Userauth = new Schema({
	email : {type:String,required:true, unique: true},
	password: {type:String,required:true},
  name:{type:String,required:true}
});

module.exports = mongoose.model('Userauth',Userauth);
