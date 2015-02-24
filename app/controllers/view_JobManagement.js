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

var view_Loading = Alloy.createController("view_Loading").getView('view_Loading');

var username = Ti.App.Properties.getString('login_user',"");
$.login_user.text = username + " your application are below";
var user = Ti.App.Properties.getObject('login_userObject',null);

var applicationList = [],positionList = [],hotelList = [];

var condition = "all";
var heightIndex = 0;

init();

function init(){
	var DisplayApplications = function(e){
		Ti.App.removeEventListener("queryApplicationsByAID",DisplayApplications);
		applicationList = e.applicationList;
		positionList = e.positionList;
		hotelList = e.hotelList;
		refresh(condition);
		$.main.remove(view_Loading);
	};
	Ti.App.addEventListener("queryApplicationsByAID",DisplayApplications);
	$.main.add(view_Loading);
	Alloy.Globals.CloudManager.queryApplicationsByUser(user.id);
}

//display applications
function refresh(filter){
	$.body.removeAllChildren();
	var application,position,hotel;
	heightIndex = 0;
	for(var i=0;i<applicationList.length;i++){
		application = applicationList[i];
		position = positionList[i];
		hotel = hotelList[i];
		if(filter == 'all'){
			if(application.AStatus == 'Processing' || application.AStatus == 'Approved'){
				addElement(i,application,position,hotel);
				heightIndex++;
			}
		}else if(filter == application.AStatus){
			addElement(i,application,position,hotel);
			heightIndex++;
		}
	}
};

function addElement(i,application,position,hotel){
	var layer = Ti.UI.createView({
		top:100*(heightIndex),
		height:100,
		width:"100%",
		borderColor: "#000000",
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
			applicationList[i].AStatus = "Cancelled"; 
			refresh(condition);
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
	if(application.AStatus == "Processing" || application.AStatus == "Approved"){
		rightView.add(buttonLabel);
	}
	layer.add(leftView);
	layer.add(rightView);
	
	$.body.add(layer);
};

//switch display condition
$.all.addEventListener('click',function(){
	if(condition!='all'){
		$.all.borderWidth = 4;
		$.all.font = {
			fontSize: 12,
			fontWeight: 'bold',
		};
		$.processing.borderWidth = 2;
		$.processing.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.approved.borderWidth = 2;
		$.approved.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.completed.borderWidth = 2;
		$.completed.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.cancelled.borderWidth = 2;
		$.cancelled.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		
		
		condition = 'all';
		refresh(condition);
	}
});

$.processing.addEventListener('click',function(){
	if(condition!='Processing'){
		$.all.borderWidth = 2;
		$.all.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.processing.borderWidth = 4;
		$.processing.font = {
			fontSize: 12,
			fontWeight: 'bold',
		};
		$.approved.borderWidth = 2;
		$.approved.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.completed.borderWidth = 2;
		$.completed.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.cancelled.borderWidth = 2;
		$.cancelled.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		
		condition = 'Processing';
		refresh(condition);
	}
});

$.approved.addEventListener('click',function(){
	if(condition!='Approved'){
		$.all.borderWidth = 2;
		$.all.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.processing.borderWidth = 2;
		$.processing.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.approved.borderWidth = 4;
		$.approved.font = {
			fontSize: 12,
			fontWeight: 'bold',
		};
		$.completed.borderWidth = 2;
		$.completed.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.cancelled.borderWidth = 2;
		$.cancelled.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		
		condition = 'Approved';
		refresh(condition);
	}
});

$.completed.addEventListener('click',function(){
	if(condition!='Completed'){
		$.all.borderWidth = 2;
		$.all.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.processing.borderWidth = 2;
		$.processing.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.approved.borderWidth = 2;
		$.approved.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.completed.borderWidth = 4;
		$.completed.font = {
			fontSize: 12,
			fontWeight: 'bold',
		};
		$.cancelled.borderWidth = 2;
		$.cancelled.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		
		condition = 'Completed';
		refresh(condition);
	}
});

$.cancelled.addEventListener('click',function(){
	if(condition!='Cancelled'){
		$.all.borderWidth = 2;
		$.all.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.processing.borderWidth = 2;
		$.processing.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.approved.borderWidth = 2;
		$.approved.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.completed.borderWidth = 2;
		$.completed.font = {
			fontSize: 12,
			fontWeight: 'normal',
		};
		$.cancelled.borderWidth = 4;
		$.cancelled.font = {
			fontSize: 12,
			fontWeight: 'bold',
		};
		
		condition = 'Cancelled';
		refresh(condition);
	}
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
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
//======[ configuration]======= 

//===========================================================================
// END OF EXPORTS
//===========================================================================

