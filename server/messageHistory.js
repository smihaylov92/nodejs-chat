var messageHistory = {
	messages: null,

	init: function(){
		this.messages = [];	
	},

	addMessage: function(msgObj){
		this.messages.push(msgObj);
	},

	getMessages: function(){
		return this.messages;
	},

	broadcastMessageHistory: function(io, socketID){
		var currMsg = null;

		for(var i = 0, len = this.messages.length; i < len; i ++){
			currMsg = this.messages[i];

			io.to(socketID).emit('message', currMsg);
		}
	}
};

module.exports = {
	init: messageHistory.init,
	addMessage: messageHistory.addMessage,
	getMessages: messageHistory.getMessages,
	broadcastMessageHistory: messageHistory.broadcastMessageHistory
}