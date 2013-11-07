var model = require('./models.js');

var GetThreads = function(res){
	model.ThreadModel.find().select('_id subject date').exec( function (err, threads) {
		if (err){ console.log("Error getting all threads");}
		else{
			console.log(threads);
			res.json(threads);
		}
	});
};

var GetThread = function(res, id){
	model.ThreadModel.find( { '_id' : id } ).exec( function (err, thread) {
		if (err){ console.log("Error getting thread with id: " + id);}
		else{
			console.log(thread);
			res.json(thread);
		}
	});
};

var PostMessage = function(res, username, text, threadId){
	var message = new model.Message(username, text);
	model.ThreadModel.findOne( { '_id' : threadId } ).exec( function (err, athread) {
		athread.AppendMessage(message);
		athread.save(function (err, thread){
			if (err){ console.log(err); }
			else {
				console.log(thread.subject);
				res.json(thread);
			}
		});
	});
}

var testrun = function(){
	var newthread = model.Thread("asdf", "asdf");
	newthread.save(function (err, thread){
		if (err){ console.log(err); }
		else {
			console.log(thread.subject);
		}
	});
};

exports.GetThreads = GetThreads;
exports.GetThread = GetThread;
exports.PostMessage = PostMessage;
exports.testrun = testrun;