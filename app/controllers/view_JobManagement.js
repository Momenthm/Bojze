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
var user = Ti.App.Properties.getObject('login_userObject',null);

refresh();

//display applications
function refresh(){
	$.body.removeAllChildren();
	var DisplayApplications = function(e){
		Ti.App.removeEventListener("queryApplicationsByAID",DisplayApplications);
		var application,position,hotel;
		for(var i=0;i<e.applicationList.length;i++){
			application = e.applicationList[i];
			position = e.positionList[i];
			hotel = e.hotelList[i];
			addElement(i,application,position,hotel);
		}
	};
	Ti.App.addEventListener("queryApplicationsByAID",DisplayApplications);
	Alloy.Globals.CloudManager.queryApplicationsByUser(user.id);
};

function addElement(heightIndex,application,position,hotel){
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
		text:hotel.HName,
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
		text:hotel.Address,
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
		text:position.StartTime,
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
		text:position.EndTime,
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
		text:position.Description,
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
	
	var buttonLabel = Ti.UI.createButton({
		aid:application.id,
		height:"fill",
		width:"100%",
		title:"cancel",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 14,
			fontWeight: 'normal',
		}
	});
	
	buttonLabel.addEventListener('click',function(){		
		var cancelApplication = function(e){
			Ti.App.removeEventListener('cancelApplicationSuccess',cancelApplication);
			refresh();
		};
		Ti.App.addEventListener('cancelApplicationSuccess',cancelApplication);
		
		Alloy.Globals.CloudManager.cancelApplication(buttonLabel.aid);
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

