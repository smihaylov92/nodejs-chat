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
var users = {},
	notificationObj = {}; 


messageHistory.init();

// route handler for home
app.get('/', function(request, response){
	response.sendFile(path.resolve(__dirname + '/client/index.html'));
});

io.on('connection', function(socket){
	socket.on('register', function(username){
		socket.username = username;
		if(messageHistory.getMessages().length){
			messageHistory.broadcastMessageHistory(io, socket.id);
		}

		notificationObj.user = username;
		notificationObj.event = 'connect';

		io.emit('notification', notificationObj);
	});

	socket.on('disconnect', function(){
		notificationObj.user = socket.username;
		notificationObj.event = 'disconnect';
		io.emit('notification', notificationObj);
	});

	socket.on('message', function(msgObj){
		msgObj.user = socket.username;

		io.emit('message', msgObj);
		messageHistory.addMessage(msgObj);
	});
})

// init http server listener
http.listen(3000, function(){
	console.log('Listening on port: 3000');
});