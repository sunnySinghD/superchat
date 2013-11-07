var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	username : String,
	text : String,
	date : { type : Date, default: Date.now() }
});

var ThreadSchema = mongoose.Schema({
	subject : String,
	password : String,
	// be careful, https://github.com/LearnBoost/mongoose/issues/1598
	date : { type : Date, default: Date.now() },
	messages : [ MessageSchema ]
});

// instance method on thread class to add message to array
ThreadSchema.methods.AppendMessage = function(Message){
	if (Message instanceof MessageModel){
		var length = this.messages.push(Message);
	}
};

var MessageModel = mongoose.model('Message', MessageSchema);
var ThreadModel = mongoose.model('Thread', ThreadSchema);

// wrapper around MessageModel, i.e. creating a document
var Message = function(name, text){
	var m = new MessageModel({ username: name ? name : "", text: text ? text : "", date : Date.now() });
	return m;
}

// wrapper around ThreadModel, i.e. creating a document
var Thread = function(subject, password){
	var t = new ThreadModel({ subject: subject ? subject : "", password : password ? password : "", date : Date.now() });
	return t;
}

exports.Message = Message;
exports.Thread = Thread; 
exports.MessageModel = MessageModel;
exports.ThreadModel = ThreadModel;