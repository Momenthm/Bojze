/*
 * 
 * 
 * 
 * Title:
 * Description: 
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	

var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_JobManagement);
var navigation = Alloy.Globals.navigation;

var username = Ti.App.Properties.getString('login_user',"");
$.login_user.text = username + " your application are below";

//display applications
var DisplayApplications = function(e){
	Ti.App.removeEventListener("queryApplicationsByAID",DisplayApplications);
	var position;
	for(var i=0;i<e.applicationList.length;i++){
		application = e.applicationList[i];
		addElement(i,application);
	}
};
Ti.App.addEventListener("queryApplicationsByAID",DisplayApplications);
Alloy.Globals.CloudManager.queryApplicationsByAID(username);

function addElement(heightIndex,application){
	var layer = Ti.UI.createView({
		top:100*(heightIndex),
		height:100,
		width:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"horizontal",
	});
	
	var leftView = Ti.UI.createView({
		left:0,
		width:"50%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var rightView = Ti.UI.createView({
		width:"50%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var hotelLabel = Ti.UI.createLabel({
		height:"20%",
		width:"100%",
		text:"hotel",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var AddressLabel = Ti.UI.createLabel({
		height:"20%",
		width:"100%",
		text:"address",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var startTimeLabel = Ti.UI.createLabel({
		height:"20%",
		width:"100%",
		text:"start",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var endTimeLabel = Ti.UI.createLabel({
		height:"20%",
		width:"100%",
		text:"end",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var descriptionLabel = Ti.UI.createLabel({
		height:"fill",
		width:"100%",
		text:"discription",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var applyTimeLabel = Ti.UI.createLabel({
		height:"33%",
		width:"100%",
		text:application.updated_at,
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var statusLabel = Ti.UI.createLabel({
		height:"33%",
		width:"100%",
		text:application.AStatus,
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	var buttonLabel = Ti.UI.createLabel({
		height:"fill",
		width:"100%",
		text:"button",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	leftView.add(hotelLabel);
	leftView.add(AddressLabel);
	leftView.add(startTimeLabel);
	leftView.add(endTimeLabel);
	leftView.add(descriptionLabel);
	rightView.add(applyTimeLabel);
	rightView.add(statusLabel);
	rightView.add(buttonLabel);
	
	layer.add(leftView);
	layer.add(rightView);
	
	$.body.add(layer);
};
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
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
//======[ configuration]======= 

//===========================================================================
// END OF EXPORTS
//===========================================================================

