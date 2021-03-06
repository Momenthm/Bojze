var Cloud = require("ti.cloud");

var navigation = Alloy.Globals.navigation;
var db = Alloy.Globals.Database;
//function for regist at view_Register
exports.userRegist = function(username,pwd,pwd_confirm){
	Cloud.Users.create({
        username : username,
        password : pwd,
        password_confirmation : pwd_confirm,
    }, function(e) {
        if (e.success) {
        	var user = e.users[0];
        	Ti.App.Properties.setString('login_user',username);
			Ti.App.Properties.setString('login_pwd',pwd);
			Ti.App.Properties.setString('login_session',e.meta.session_id);
			Ti.App.Properties.setObject('login_userObject',user);
			
			Ti.App.fireEvent('registSuccess',{});
            // alert(e.users[0].username + " is logged in." + e.meta.session_id);
        } else {
            alert("Error: " + e.message);
        }
    });
};

//function for login at view_main and view_login
exports.userLogin = function(username,pwd,from){
	Cloud.Users.login({
	    login: username,
	    password: pwd,
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        Ti.App.Properties.setString('login_user',username);
			Ti.App.Properties.setString('login_pwd',pwd);
			Ti.App.Properties.setString('login_session',e.meta.session_id);
			Ti.App.Properties.setObject('login_userObject',user);
	        // alert("e.meta.user_id:"+user.id);
	        // Ti.App.Properties.setString('user_id',e.meta.user_id);
	        
		    Ti.App.fireEvent('loginSuccess',{
		    	from:from,
		    });
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//used in exports.queryPositions
var QueryPhotoURL = function(photo_id,index){
	var photoURL;
	// alert("photo_id:"+photo_id);
	Cloud.Photos.query({
		where:{
			id:photo_id,
		}
	},
	function (e) {
	    if (e.success) {
	    	// alert("e.photo.length:"+e.photos.length);
	        if (e.photos.length == 0) {
	            alert('No photos!');
	        }
	        else {
	   			// alert("index:"+index+"\n"+"photo_id:"+photo_id+"\n"+"length:"+e.photos.length+"\n"+"photoURL:"+e.photos[0].urls.square_75);
	   			
	                // Ti.API.info(e.photos[0].filename + ': '
	                    // + e.photos[0].urls.square_75);
	     		photoURL = e.photos[0].urls.square_75;
	     		Ti.App.fireEvent("Hotel_PhotoURL",{
	     			photoURL:photoURL,
	     			index:index,
	     		});
	        }
	    }
	    else {
	        alert(e);
	    }
	});
};

//used in exports.queryPositions
var queryHotelPhotoWithHID  = function(hid,index){
	var photo_id;
	Cloud.Objects.query({
		classname:'HOTEL',
		limit:1,
		where:{
			id:hid,
		}
	},function (e) {
	    if (e.success) {
	    	photo_id = e.HOTEL[0].photo_id;
	    	// alert(index+":"+photo_id);
			QueryPhotoURL(photo_id,index);
	    }
	    else {
	        alert(e);
	    }
	});
};

//function for position query at view_Main
exports.queryPositions = function(){
	Cloud.Objects.query({
	    classname: 'POSITION',
	    limit:1000,
	}, function (e) {
	    if (e.success) {
	    	var position_length = e.POSITION.length;
	    	var POSITION = e.POSITION;
	        var photoURL_List = [];
	        var position;
	        var index = 0;
	        var GETphotoURL = function(e){
	        	// alert(e.photoURL);
	        	photoURL_List.push(e.photoURL);
	        	if((e.index+1) == position_length){
	        		Ti.App.removeEventListener("Hotel_PhotoURL",GETphotoURL);
	        		// alert(photoURL_List.length);
			        Ti.App.fireEvent("queryPosition",{
			        	positionList:POSITION,
			        	photoList:photoURL_List,
			        });  
	        	}else{
	        		index++;
	        		position = POSITION[index];
	        		queryHotelPhotoWithHID(position.HID,index);
	        	}
	        };
	        Ti.App.addEventListener("Hotel_PhotoURL",GETphotoURL);
	        
	        position = POSITION[index];
	        queryHotelPhotoWithHID(position.HID,index);
	               
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//used in queryApplicationsByUser
var queryHotelForApplication = function(position,index){
	Cloud.Objects.query({
	    classname: 'HOTEL',
	    limit:1000,
	    where:{
	    	id:position.HID,
	    }
	}, function (e) {
	    if (e.success) {
	    	if(e.HOTEL.length == 1){
	    		var hotel = e.HOTEL[0];
		    	Ti.App.fireEvent("queryHotelAndPositionForApplications",{
		    		index:index,
		    		position:position,
		    		hotel:hotel,
		    	});	
	    	}       
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//used in queryApplicationsByUser
var queryPositionForApplication = function(application,index){
	Cloud.Objects.query({
	    classname: 'POSITION',
	    limit:1000,
	    where:{
	    	id:application.PID,
	    }
	}, function (e) {
	    if (e.success) {
	    	if(e.POSITION.length == 1){
	    		var position = e.POSITION[0];
				queryHotelForApplication(position,index);
	        }   
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//function for position query at view_JobManagement
exports.queryApplicationsByUser = function(uid){
	Cloud.Objects.query({
	    classname: 'APPLICATION',
	    limit:1000,
	    where:{
	    	user_id:uid,
	    }
	}, function (e) {
	    if (e.success) {
	    	var index = 0;
	    	var APPLICATION_length = e.APPLICATION.length;
	    	var applicationList = e.APPLICATION;
	    	var positionList = [];
	    	var hotelList = [];
	    	
	    	var getPosition = function(e){
	    		positionList.push(e.position);
	    		hotelList.push(e.hotel);
	    		if(e.index == (APPLICATION_length - 1)){
	    			Ti.App.removeEventListener('queryHotelAndPositionForApplications',getPosition);
	    			Ti.App.fireEvent("queryApplicationsByAID",{
			    		applicationList:applicationList,
			    		positionList:positionList,
			    		hotelList:hotelList,
			    	});
	    		}else{
	    			index++;
	    			queryPositionForApplication(applicationList[index],index);
	    		}
	    	};
	    	Ti.App.addEventListener('queryHotelAndPositionForApplications',getPosition);
	    	
	    	queryPositionForApplication(applicationList[index],index);        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//function for cancel application at JobManagement
exports.cancelApplication = function(aid){
	var session_id = Ti.App.Properties.getString('login_session','');
	Cloud.Objects.update({
		session_id:session_id,
	    classname: 'APPLICATION',
	    id:aid,
	    fields:{
	    	AStatus:"Cancelled",
	    },
	  
	}, function (e) {
	    if (e.success) {
	        // alert('Success');
	        Ti.App.fireEvent('cancelApplicationSuccess',{});
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//query hotel with PID
exports.queryHotelWithHID = function(hid){
	Cloud.Objects.query({
	    classname: 'HOTEL',
	    limit:1,
	    where:{
	    	id:hid,
	    }
	}, function (e) {
	    if (e.success) {    	
	    	// alert("length:"+e.HOTEL.length);
	    	if(e.HOTEL.length == 1){
	    		var hotel = e.HOTEL[0];
		    	Ti.App.fireEvent('queryHotelSuccess',{
		    		hotel:hotel,
		    	});
	    	}
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

//Job Application
exports.createApplication = function(session_id,pid){
	Cloud.Objects.create({
		session_id:session_id,
		classname:'APPLICATION',
		fields:{
			AStatus:"Processing",
			PID:pid,
		}
	},function(e){
        if (e.success) {
	        var application = e.APPLICATION[0];
	        alert('Success:\n' +
	            'id: ' + application.id + '\n' +
	            'PID' + application.PID + '\n' +
	            'AStatus' + application.AStatus + '\n' +
	            'created_at: ' + application.created_at);
	       	// var check = db.execute('SELECT count(id) from APPLICATIONS WHERE id = ?',application.id);
	       	// var countCheck = 0;
	       	// if(check.isValidRow()){
	       		// countCheck = check.fieldByName('count(id)');
	       	// }
	       	// check.close();
// 	       	
	       	// if(countCheck == 0){
	       		// db.execute('INSERT INTO APPLICATIONS(id,HName,Address,PID,AStatus,created_at,user_id) VALUES (?,?,?,?,?,?,?)',application.id,hotel.HName,hotel.Address,application.PID,application.AStatus,application.updated_at,user.id);
	       	// }
	       	
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
    });
};

