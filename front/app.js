var express = require('express');
var app = express();

// set up front end routing
app.use(express.static(__dirname + '/public'));
var SERVE_PORT = 3000;

app.listen(SERVE_PORT);
console.log('Listening on port ' + SERVE_PORT);