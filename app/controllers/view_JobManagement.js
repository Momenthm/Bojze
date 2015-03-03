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
var db = Alloy.Globals.Database;
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
var readFromLocal = Ti.App.Properties.getBool('readLocalApplications',false);

init();

function init(){
	
	if(readFromLocal == false){
		var DisplayApplications = function(e){
			Ti.App.removeEventListener("queryApplicationsByAID",DisplayApplications);
			applicationList = e.applicationList;	
			positionList = e.positionList;
			hotelList = e.hotelList;
			for(var i=0;i<applicationList.length;i++){
				var application = applicationList[i];
				var position = positionList[i];
				var hotel = hotelList[i];
				
				var check = db.execute("SELECT count(id) from APPLICATIONS WHERE id=?",application.id);
				var countCheck = 0;
				if(check.isValidRow()){
					countCheck = check.fieldByName('count(id)');
				}
				check.close();
				if(countCheck == 0){
					db.execute('INSERT INTO APPLICATIONS(id,HName,Address,PID,AStatus,created_at,user_id) VALUES (?,?,?,?,?,?,?)',application.id,hotel.HName,hotel.Address,application.PID,application.AStatus,application.updated_at,user.id);
				}
			}
			
			switchTab(condition);
			$.main.remove(view_Loading);
			Ti.App.Properties.setBool('readLocalApplications',true);
		};
		Ti.App.addEventListener("queryApplicationsByAID",DisplayApplications);
		$.main.add(view_Loading);
		Alloy.Globals.CloudManager.queryApplicationsByUser(user.id);
	}else{
		// alert('readApplicationFromLocal');
		var applicationValues = db.execute('SELECT * from APPLICATIONS where user_id = ?',user.id);
		while(applicationValues.isValidRow()){
			var application = {
				id:applicationValues.fieldByName('id'),
				PID:applicationValues.fieldByName('PID'),
				AStatus:applicationValues.fieldByName('AStatus'),
				updated_at:applicationValues.fieldByName('created_at'),
			};
			
			var position;
			
			var positionValues = db.execute('SELECT * from POSITIONS where id=?',applicationValues.fieldByName('PID'));
			if(positionValues.isValidRow()){
				position = {
					id:positionValues.fieldByName('id'),
					HID:positionValues.fieldByName('HID'),
					StartTime:positionValues.fieldByName('startTime'),
					EndTime:positionValues.fieldByName('endTime'),
					created_at:positionValues.fieldByName('created_at'),
					Salary:positionValues.fieldByName('salary'),
					Vacancy:positionValues.fieldByName('vacancy'),
					Description:positionValues.fieldByName('description'),
				};
			}
			positionValues.close();
			
			var hotel = {
				HName:applicationValues.fieldByName('HName'),
				Address:applicationValues.fieldByName('Address'),
			};
			
			applicationList.push(application);
			positionList.push(position);
			hotelList.push(hotel);
			
			// alert(application);
			// alert(position);
			// alert(hotel);
			applicationValues.next();
		}
		applicationValues.close();
		
		switchTab(condition);
	}
}

//display applications
function switchTab(filter){
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
			switchTab(condition);
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
		switchTab(condition);
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
		switchTab(condition);
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
		switchTab(condition);
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
		switchTab(condition);
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
		switchTab(condition);
	}
});

//for bounce refresh
$.body.addEventListener('dragend',function(){
	if($.body.contentOffset.y <= -70){
		alert("refresh");
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

