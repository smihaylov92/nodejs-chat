var express = require('express'),
	app = express(); // function handler, supply to an HTTP server

var http = require('http').Server(app); 
var io = require('socket.io')(http);
var path  = require('path');

app.use("/client", express.static(path.join(__dirname, 'client')));
app.use("/lib", express.static(path.join(__dirname, 'lib')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
// app.use("server", express.static(path.resolve(__dirname + '/server')));

var messageHistory = require('./server/messageHistory');
var basket = {}; // to do


messageHistory.init();

console.log(__dirname);



// route handler for home
app.get('/', function(request, response){
	response.sendFile(path.resolve(__dirname + '/client/index.html'));
});

io.on('connection', function(socket){
	console.log('a user connected');

	if(messageHistory.getMessages().length){
		messageHistory.broadcastMessageHistory(io, socket.id);
	}

	socket.on('register', function(data){
		//To Do
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('message', function(msgObj){
		io.emit('message', msgObj);
		messageHistory.addMessage(msgObj);
	});
})

// init http server listener
http.listen(3000, function(){
	console.log('Listening on port: 3000');
});