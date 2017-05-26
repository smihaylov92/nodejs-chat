var Utils = {
	getTimestamp: function(){
		var today = new Date(),
			date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
			time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
			timestamp = date + ' ' + time;

		return timestamp;
	},

	prefixDatePart: function(){
		
	}
};
