'use strict';
// exposing io global
var socket = io();

var doc = document,
	form = doc.querySelector('body > form'),
	input = doc.getElementById('new_message'),
	msgBoard = doc.getElementById('message_board');

form.onsubmit = function(){
	var msgObj = {};

	msgObj.message = input.value;
	msgObj.timestamp = Utils.getTimestamp();

	socket.emit('message', msgObj);
	input.value = '';

	return false;
};

socket.on('message', function(msgObj){
	var newMsg = doc.createElement('li');

	newMsg.innerHTML = msgObj.timestamp + ' ' + msgObj.message;

	msgBoard.appendChild(newMsg);
});