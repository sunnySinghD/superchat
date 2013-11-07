var express = require('express');
var app = express();
app.use(express.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var data = require('./data');

// set up server routing 
var SERVE_PORT = 3001;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	app.use(function(req, res, next) {
	  	res.header("Access-Control-Allow-Origin", "*");
	  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  	next();
	});

	app.get('/test', function(req, res){
		res.send("GET to test");
		data.testrun();
	});

	app.get('/data', function(req, res){
		//res.send("GET to /data asdfasdfasdfsa");
		data.GetThreads(res);
	});

	app.get('/data/:id', function(req, res){
		data.GetThread(res, req.params.id);
	});

	app.post('/data/:id', function(req, res){
		if (!req.body.hasOwnProperty('username') || 
			!req.body.hasOwnProperty('text')) {
			res.statusCode = 400;
			return res.send('Error 400: Post syntax incorrect.')
		}
		data.PostMessage(res, req.body.username, req.body.text, req.params.id)
	});
	app.listen(SERVE_PORT);
	console.log('Listening on port ' + SERVE_PORT);

});

