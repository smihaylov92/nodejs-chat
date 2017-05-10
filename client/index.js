(function(){
	// exposing io global
	var socket = io();

	var form = document.querySelector('body > form'),
		input = document.getElementById('new_message');

	form.onsubmit = function(){
		socket.emit('chat message', input.value);
		input.value = '';

		return false;
	};
})();


