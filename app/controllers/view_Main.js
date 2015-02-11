var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_Main);
var navigation = Alloy.Globals.navigation;
// var Cloud = Alloy.Globals.Cloud;
var sessionId = "";
// var loadedOnce = Ti.App.Properties.getBool("loadOnce", false);

//var CloudFunc = require('CloudFunc');

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
		navigation.open("view_Detail",{title: "Detail"});
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

// var refresh_Login = function(){
	// alert("here?");
	// // var user = Ti.App.Properties.getString('login_user',"");
	// // if(user != ""){
		// // $.loginStatus.text = "logout";
		// // $.titleLabel.text = "welcome "+user;
	// // }else{
		// // $.loginStatus.text = "login";
		// // $.titleLabel.text = "You have not login yet";
	// // }
// };

		// var period = Ti.UI.createLabel({
			// left:0,
			// width:"30%",
			// text:i+"period",
			// borderColor: "#EAEAFA",
			// borderWidth: 1,
		// });
// 		
		// var discription = Ti.UI.createLabel({
			// width:"40%",
			// text:i+"discription",
			// borderColor: "#EAEAFA",
			// borderWidth: 1,
		// });
// 		
		// var vacancy = Ti.UI.createLabel({
			// width:"30%",
			// text:i+"vacancy",
			// borderColor: "#EAEAFA",
			// borderWidth: 1,
		// });
// 		
		// layer.add(period);
		// layer.add(discription);
		// layer.add(vacancy);
		
		
	// }
// var labeltest = Ti.UI.createLabel({
	// text:"xxx",
	// textAlign:"center",
	// color:"#000000",
	// font:{
		// fontSize: 12,
		// fontWeight: 'normal',
	// }
// });
// 
// $.titleView.add(labeltest);
// $.body.add(labeltest);

/*
var usernameInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var passwrodInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var HotelIDInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var HotelnameInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});


$.line1.add(usernameInput);
$.line2.add(passwrodInput);
$.display.add(HotelIDInput);
$.display.add(HotelnameInput);
function init(){ 
	if(loadedOnce == false){
		// Cloud.Users.create({
	        // username : "Ronn",
	        // password : "123456",
	        // password_confirmation : "123456"
	    // }, function(e) {
	        // if (e.success) {
	            // alert(e.users[0].username + " is enrolled.");
	            // Ti.App.Properties.setBool("loadOnce", true);
	        // } else {
	            // alert("Error: " + e.message);
	        // }
	    // });
	    createUser("Ronn","123456");
	    createUser("Lutarez","654321");
	    Ti.App.Properties.setBool("loadOnce", true);
	}
}

function createUser(name,pwd){
	Cloud.Users.create({
	        username : name,
	        password : pwd,
	        password_confirmation : pwd,
	    }, function(e) {
	        if (e.success) {
	            alert(e.users[0].username + " is enrolled.");
	            // Ti.App.Properties.setBool("loadOnce", true);
	        } else {
	            alert("Error: " + e.message);
	        }
	});
}

init();


$.login.addEventListener('click',function(){
	loginUser();
});

function loginUser(e){
	Cloud.Users.login({
	    login: usernameInput.value,
	    password: passwrodInput.value,
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        sessionId = e.meta.session_id;
	        alert(e.meta.session_id);
	        // alert('Success:\n' +
	            // 'id: ' + user.id + '\n' +
	            // 'sessionId: ' + Cloud.sessionId + '\n' +
	            // 'first name: ' + user.first_name + '\n' +
	            // 'last name: ' + user.last_name);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

// function createHotel(e,pid,hid,period,discription,vacancy){
function createHotel(e,hid,hname){
	Cloud.Objects.create({
		session_id:sessionId,
	    classname: 'hotels',
	    // fields: {
	        // make: 'nissan',
	        // color: 'blue',
	        // year: 2005
	    // }
	    fields:{
	    	hid:hid,
	    	name:hname,
	    }
	    // fields:{
	    	// pid:pid,
	    	// hid:hid,
	    	// period:period,
	    	// discription:discrition,
	    	// vacancy:vacancy,
	    	// publishDateTime:publishDateTime,
	    // }
	}, function (e) {
	    if (e.success) {
	        var hotel = e.hotels[0];
	        
	        	alert('Success:\n' +
	            'hid: ' + hotel.hid + '\n' +
	            'name: ' + hotel.name + '\n' + 
	            'created_at: ' + hotel.created_at);
	        // alert('Success:\n' +
	            // 'id: ' + car.id + '\n' +
	            // 'make: ' + car.make + '\n' +
	            // 'color: ' + car.color + '\n' +
	            // 'year: ' + car.year + '\n' +
	            // 'created_at: ' + car.created_at);
	            // alert('Success:\n' +
	            // 'pid: ' + position.pid + '\n' +
	            // 'hid: ' + position.hid + '\n' +
	            // 'period: ' + position.period + '\n' +
	            // 'discription: ' + position.discription + '\n' +
	            // 'vacancy: ' + position.vacancy + '\n' +
	            // 'publishDateTime: ' + postion.publishDateTime + '\n' + 
	            // 'created_at: ' + position.created_at);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

$.insert.addEventListener('click',function(e){
	createHotel(e,HotelIDInput.value,HotelnameInput.value);
	// for(var i = 1;i < 5;i++){
// 		
	// }
});

// $.insert.addEventListener('click',function(e){
	// createHotel(e,HotelIDInput.value,HotelnameInput.value);
// });

function queryData(e){
	Cloud.Objects.query({
	    classname: 'hotels',
	    page: 1,
	    per_page: 10,
	    // where: {
	        // color: 'blue'
	    // }
	}, function (e) {
	    if (e.success) {
	        alert('Success:\n' +
	            'Count: ' + e.hotels.length);
	        for (var i = 0; i < e.hotels.length; i++) {
	            var hotel = e.hotels[i];
	            alert('hid: ' + hotel.hid + '\n' +
	                'name: ' + hotel.name + '\n' +
	                'created_at: ' + hotel.created_at);
	            
	            DisplayHotel(i,hotel.hid,hotel.name);
	            // deleteHotel(e,hotel.id);
	        }
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function DisplayHotel(height_index,hid,hname){
	var hidLabel = Ti.UI.createLabel({
		text:hid,
		left:"5%",
		width:"30%",
		height:Ti.UI.SIZE,
	});
	
	var hnameLabel = Ti.UI.createLabel({
		text:hname,
		left:"40%",
		width:"30%",
		height:Ti.UI.SIZE,
	});
	
	var viewline = Ti.UI.createView({
		top:20*(height_index),
		width:"100%",
		height:20,
	});
	
	viewline.add(hidLabel);
	viewline.add(hnameLabel);
	$.display2.add(viewline);
}

$.query.addEventListener('click',function(e){
	queryData(e);
	// var i;
	// for(i=1;i<=20;i++){
		// addElement(i);
	// }
});

function deleteHotel(e,id){
	Cloud.Objects.remove({
	session_id:sessionId,
    classname: 'hotels',
    id: id,
	}, function (e) {
	    if (e.success) {
	        alert('Success');
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function addElement(heightIndex){
	
	// for(var i=1;i <= num;i++){
	var layer = Ti.UI.createView({
			top:60*(heightIndex-1),
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
		width:"45%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var rightView = Ti.UI.createView({
		// left:"65%",
		width:"35%",
		height:"100%",
		borderColor: "#EAEAFA",
		borderWidth: 1,
		layout:"vertical",	
	});
	
	var hotelName = Ti.UI.createLabel({
		// top:"5%",
		height:"33%",
		width:"100%",
		text:heightIndex+" hotel",
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var period = Ti.UI.createLabel({
		// top:"35%",
		height:"33%",
		width:"100%",
		text:heightIndex+" period",
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var publishDate = Ti.UI.createLabel({
		// top:"75%",
		height:"34%",
		width:"100%",
		text:heightIndex+" publishDate",
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var Image = Ti.UI.createLabel({
		top:"5%",
		height:"40%",
		width:"100%",
		text:heightIndex+" Image",
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	var Vacancy = Ti.UI.createLabel({
		// top:"45%",
		height:"40%",
		width:"100%",
		text:heightIndex+" Vacancy",
		borderColor: "#EAEAFA",
		borderWidth: 1,
	});
	
	leftView.add(hotelName);
	leftView.add(period);
	leftView.add(publishDate);
	rightView.add(Image);
	rightView.add(Vacancy);
	
	layer.add(hotelImage);
	layer.add(leftView);
	layer.add(rightView);
	$.display2.add(layer);
	
	
		// var period = Ti.UI.createLabel({
			// left:0,
			// width:"30%",
			// text:i+"period",
			// borderColor: "#EAEAFA",
			// borderWidth: 1,
		// });
// 		
		// var discription = Ti.UI.createLabel({
			// width:"40%",
			// text:i+"discription",
			// borderColor: "#EAEAFA",
			// borderWidth: 1,
		// });
// 		
		// var vacancy = Ti.UI.createLabel({
			// width:"30%",
			// text:i+"vacancy",
			// borderColor: "#EAEAFA",
			// borderWidth: 1,
		// });
// 		
		// layer.add(period);
		// layer.add(discription);
		// layer.add(vacancy);
		
		
	// }
}
*/