var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_Main);

$.view_Main.height = "80%";

var view_Loading = Alloy.createController("view_Loading").getView('view_Loading');
var view_Tabs = Alloy.createController("view_Tabs").getView('view_Tabs');
view_Tabs.top = "80%";
$.main.add(view_Tabs);

var navigation = Alloy.Globals.navigation;
var sessionId = "";

//clear seesion id
Ti.App.Properties.setString('login_session',"");
//get saved user
var savedUsername = Ti.App.Properties.getString('login_user',"");
var savedPassword = Ti.App.Properties.getString('login_pwd',"");
Ti.App.addEventListener('loginSuccess',function(e){
	if(e.from == "view_Main"){
		Ti.App.fireEvent('refreshLogin',{  	
		});  
	}
});
if(savedUsername != "" && savedPassword != ""){
	Alloy.Globals.CloudManager.userLogin(savedUsername, savedPassword, "view_Main");
}

Ti.App.addEventListener('toUserProfile',function(){
	navigation.open("view_UserProfile", {title: "Profile"});
});

Ti.App.addEventListener('toJobManagement',function(){
	navigation.open("view_JobManagement", {title: "JobManagement"});
});

init();

function init(){
	var DisplayPosition = function(e){
		Ti.App.removeEventListener('queryPosition',DisplayPosition);
		for(var i=0;i<(e.positionList).length;i++){
			var position = e.positionList[i];
			var photoURL = e.photoList[i];
			addElement(i,photoURL,position);
		}
		$.main.remove(view_Loading);
	};
	Ti.App.addEventListener('queryPosition',DisplayPosition);
	
	$.main.add(view_Loading);
	Alloy.Globals.CloudManager.queryPositions();
}

var refresh = function(){
	$.body.removeAllChildren();
	init();
};

$.titleLabel.addEventListener('click',refresh);

function addElement(heightIndex,photoURL,position){
	var layer = Ti.UI.createView({
		pid:position.id,
		hid:position.HID,
		top:60*(heightIndex),
		height:60,
		width:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"horizontal",
	});	
	
	var hotelImage = Ti.UI.createView({
		left:0,
		height:"100%",
		width:"20%",
	});
	
	var hotelImageDisplay = Ti.UI.createImageView({
		// image:'https://s3-us-west-1.amazonaws.com/storage.cloud.appcelerator.com/TKgkBChJRV2RhlMzFXz0lU3vjcH5AU9a/photos/dd/7a/54d9aaffc069eb7f9b043440/vt2_square_75.jpg'
		image:photoURL,
	});
	
	var leftView = Ti.UI.createView({
		left:0,
		width:"60%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var rightView = Ti.UI.createView({
		width:"20%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var descriptionLabel = Ti.UI.createLabel({
		// top:"5%",
		height:"33%",
		width:"100%",
		text:position.Description,
		borderColor: "#EAEAFA",
		borderWidth: 1,
		font:{
			fontSize: 10,
			fontWeight: 'normal',
		}
	});
	
	var period = Ti.UI.createLabel({
		// top:"35%",
		height:"33%",
		width:"100%",
		text:Alloy.Globals.commonFunc.formatConverter(position.StartTime)+"-"+Alloy.Globals.commonFunc.formatConverter(position.EndTime),
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var publishDateLabel = Ti.UI.createLabel({
		// top:"75%",
		height:"34%",
		width:"100%",
		text:position.created_at,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var SalaryLabel = Ti.UI.createLabel({
		top:"5%",
		height:"40%",
		width:"100%",
		text:position.Salary,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var VacancyLabel = Ti.UI.createLabel({
		// top:"45%",
		height:"40%",
		width:"100%",
		text:position.Vacancy,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	leftView.add(descriptionLabel);
	leftView.add(period);
	leftView.add(publishDateLabel);
	rightView.add(SalaryLabel);
	rightView.add(VacancyLabel);
    hotelImage.add(hotelImageDisplay);
	
	layer.add(hotelImage);
	layer.add(leftView);
	layer.add(rightView);
	
	layer.addEventListener('click',function(){
		// alert(layer.index);
		var receiver = function(e){
			Ti.App.removeEventListener('queryHotelSuccess',receiver);
			navigation.open("view_PositionDetail",{title: "Detail", position:position, hotel:e.hotel,});
		};
		Ti.App.addEventListener('queryHotelSuccess',receiver);
		
		Alloy.Globals.CloudManager.queryHotelWithHID(layer.hid);
		
	});
	
	$.body.add(layer);
}	

var LoginRefresh = function(){
	var user = Ti.App.Properties.getString('login_user',"");
	if(user != ""){
		$.loginStatus.text = "logout";
		$.titleLabel.text = "welcome "+user;
		$.topLeft.removeAllChildren();
	}else{
		$.loginStatus.text = "login";
		$.titleLabel.text = "You have not login yet";
		var registerLink = Ti.UI.createLabel({
			top:"5%",
			height:"25%",
			text:"Regist",
			textAlign:"center",
			color:"#000000",
			font:{
				fontSize: 12,
				fontWeight: 'normal',
			}
		});
		
		registerLink.addEventListener('click',function(){
			navigation.open("view_Register", {title: "Regist"});
		});
		
		$.topLeft.add(registerLink);
	}
};

$.loginStatus.addEventListener('click',function(){
	var user = Ti.App.Properties.getString('login_user',"");
	if(user == ""){
		navigation.open("view_Login", {title: "Login"});
	}else{
		Ti.App.Properties.setString('login_user',"");
	    Ti.App.Properties.setString('login_pwd',"");
	    Ti.App.Properties.setString('login_session',"");
	    Ti.App.Properties.setObject('login_userObject',null);
	    LoginRefresh();
	}
});

LoginRefresh();
Ti.App.addEventListener('refreshLogin',LoginRefresh);

//bounce refresh
$.body.addEventListener('dragend',function(){
	if($.body.contentOffset.y <= -70){
		refresh();
	}
});


