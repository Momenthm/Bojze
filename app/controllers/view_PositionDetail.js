
//===========================================================================
// PROPERTIES
//===========================================================================	
var args = arguments[0] || {};

// var positionDetail = args.positionDetail;

exports.baseController = "view_Base";
$.main.add($.view_PositionDetail);
var navigation = Alloy.Globals.navigation;

$.applyView.addEventListener('click',function(e){
	var session_id = Ti.App.Properties.getString('login_session',"");
	var username = Ti.App.Properties.getString('login_user',"");
	var pid = args.pid;
	Alloy.Globals.CloudManager.createApplication(session_id,pid,username);
});

//===========================================================================
// END OF PROPERTIES
//===========================================================================	
//===========================================================================
// END OF PROPERTIES
//===========================================================================	


//===========================================================================
// HANDLERS
//===========================================================================	

//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// SERVICE RESPONSES
//===========================================================================	

//===========================================================================
// END OF SERVICE RESPONSES
//===========================================================================	


//===========================================================================
// SERVICE REQUESTS
//===========================================================================	

//===========================================================================
// END OF SERVICE REQUESTS
//===========================================================================	


//===========================================================================
// FUNCTIONS
//===========================================================================

//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================

//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================

//===========================================================================
// END OF EXPORTS
//===========================================================================