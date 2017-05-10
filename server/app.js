var express = require('express'),
	app = express(); // function handler, supply to an HTTP server
var http = require('http').Server(app); 
var io = require('socket.io')(http);
var path  = require('path');

//
app.use("/client", express.static(__dirname + '/../client'));

// route handler for home
app.get('/', function(request, response){
	response.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		// var today = new Date(),
		// 	date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
		// 	time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
		// 	timestamp = date + ' ' + time;

		console.log('message:', msg);
		// console.log('timestamp:', timestamp);
	});
})

// init http server listener
http.listen(3000, function(){
	console.log('Listening on port: 3000');
});