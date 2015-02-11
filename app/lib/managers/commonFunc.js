exports.formatConverter = function(inputString){
	var YYMMDD = /(\d\d\d\d)-(\d\d)-(\d\d)/.exec(inputString);
	var HHMMSS = /(\d\d):(\d\d):(\d\d)/.exec(inputString);
	
	var year = YYMMDD[1];
	var month = YYMMDD[2];
	var day = YYMMDD[3];
	var hour = HHMMSS[1];
	var minute = HHMMSS[2];
	var second = HHMMSS[3];
	
	var monthInLetter;
	if(month=="01"){
		monthInLetter = "JAN";
	}else if(month=="02"){
		monthInLetter = "FEB";
	}else if(month=="03"){
		monthInLetter = "MAR";
	}else if(month=="04"){
		monthInLetter = "APR";
	}else if(month=="05"){
		monthInLetter = "MAY";
	}else if(month=="06"){
		monthInLetter = "JUN";
	}else if(month=="07"){
		monthInLetter = "JUL";
	}else if(month=="08"){
		monthInLetter = "AUG";
	}else if(month=="09"){
		monthInLetter = "SEP";
	}else if(month=="10"){
		monthInLetter = "OCT";
	}else if(month=="11"){
		monthInLetter = "NOV";
	}else if(month=="12"){
		monthInLetter = "DEC";
	}
	
	return YYMMDD[1];
};
