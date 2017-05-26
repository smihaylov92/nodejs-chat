var Utils = {
	getTimestamp: function(){
		var today = new Date(),
			date = this.prefixDatePart(today.getDate()) + '-' + this.prefixDatePart((today.getMonth() + 1)) + '-' + today.getFullYear(),
			time = this.prefixDatePart(today.getHours()) + ':' + this.prefixDatePart(today.getMinutes()) + ':' + this.prefixDatePart(today.getSeconds()),
			timestamp = date + ' ' + time;

		return timestamp;
	},

	prefixDatePart: function(datePart){
		return datePart >= 10 ? datePart : '0' + datePart; 
	}
};
