var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_Main);
var navigation = Alloy.Globals.navigation;
// var Cloud = Alloy.Globals.Cloud;
var sessionId = "";
// var loadedOnce = Ti.App.Properties.getBool("loadOnce", false);


Ti.App.Properties.setString('login_user',"");
Ti.App.Properties.setString('login_pwd',"");
Ti.App.Properties.setString('login_session',"");

// $.titleLabel.addEventListener('click',function(e){
	// $.body.removeAllChildren();
	// queryPositions(e);
// });

Ti.App.addEventListener('queryPosition',function(e){
	// alert('salary: ' + e.positionList[0].Salary + '\n' +
	                // 'vacancy: ' + e.positionList[0].Vacancy + '\n' +
	                // 'description: ' + e.positionList[0].Description + '\n' +
	                // 'created_at: ' + e.positionList[0].created_at);
	for(var i=0;i<(e.positionList).length;i++){
		var position = e.positionList[i];
		addElement(i,position.StartTime,position.EndTime,position.created_at,position.Vacancy,position.Salary,position.Description);
	}
});

Alloy.Globals.CloudManager.queryPositions();
// queryPositions();
// 
// function queryPositions(e){
	// $.body.removeAllChildren();
	// Cloud.Objects.query({
	    // classname: 'POSITION',
	    // limit:1000,
	    // // page: 1,
	    // // per_page: 10,
	    // // where: {
	        // // color: 'blue'
	    // // }
	// }, function (e) {
	    // if (e.success) {
	        // // alert('Success:\n' +
	            // // 'Count: ' + e.POSITION.length);
	        // for (var i = 0; i < e.POSITION.length; i++) {
	            // var position = e.POSITION[i];
	            // // alert('salary: ' + position.Salary + '\n' +
	                // // 'vacancy: ' + position.Vacancy + '\n' +
	                // // 'description: ' + position.Description + '\n' +
	                // // 'created_at: ' + position.created_at);
	            // // deleteHotel(e,hotel.id);
// 	            
	            // addElement(i,position.StartTime,position.EndTime,position.created_at,position.Vacancy,position.Salary,position.Description);
	        // }
	    // } else {
	        // alert('Error:\n' +
	            // ((e.error && e.message) || JSON.stringify(e)));
	    // }
	// });
// }

function grabImage(hid){
	Cloud.Objects.query({
	    classname: 'HOTEL',
	    limit:1000,
	    where:{
	    	HID:hid,
	    }
	}, function (e) {
	    if (e.success) {
	        // alert('Success:\n' +
	            // 'Count: ' + e.POSITION.length);
	        // for (var i = 0; i < e.POSITION.length; i++) {
	            // var position = e.POSITION[i];
	            // // alert('salary: ' + position.Salary + '\n' +
	                // // 'vacancy: ' + position.Vacancy + '\n' +
	                // // 'description: ' + position.Description + '\n' +
	                // // 'created_at: ' + position.created_at);
	            // // deleteHotel(e,hotel.id);
// 	            
	            // addElement(i,position.StartTime,position.EndTime,position.created_at,position.Vacancy,position.Salary,position.Description);
	        // }
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function addElement(heightIndex,startTime,endTime,publishTime,vacancy,salary,description){
	
	// for(var i=1;i <= num;i++){
	var layer = Ti.UI.createView({
		index:(heightIndex+1),
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
	
	var leftView = Ti.UI.createView({
		left:0,
		width:"60%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var rightView = Ti.UI.createView({
		// left:"65%",
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
		text:description,
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
		text:startTime+"-"+endTime,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var publishDateLabel = Ti.UI.createLabel({
		// top:"75%",
		height:"34%",
		width:"100%",
		text:publishTime,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var SalaryLabel = Ti.UI.createLabel({
		top:"5%",
		height:"40%",
		width:"100%",
		text:salary,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var VacancyLabel = Ti.UI.createLabel({
		// top:"45%",
		height:"40%",
		width:"100%",
		text:vacancy,
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	leftView.add(descriptionLabel);
	leftView.add(period);
	leftView.add(publishDateLabel);
	rightView.add(SalaryLabel);
	rightView.add(VacancyLabel);
	
	layer.add(hotelImage);
	layer.add(leftView);
	layer.add(rightView);
	
	layer.addEventListener('click',function(){
		alert(layer.index);
		navigation.open("view_PositionDetail",{title: "Detail"});
	});
	
	$.body.add(layer);
}	

var LoginRefresh = function(){
	var user = Ti.App.Properties.getString('login_user',"");
	if(user != ""){
		$.loginStatus.text = "logout";
		$.titleLabel.text = "welcome "+user;
	}else{
		$.loginStatus.text = "login";
		$.titleLabel.text = "You have not login yet";
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
	    LoginRefresh();
	}
});
LoginRefresh();
Ti.App.addEventListener('refreshLogin',LoginRefresh);
