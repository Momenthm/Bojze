var Cloud = require("ti.cloud");

var navigation = Alloy.Globals.navigation;

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
			HID:hid,
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

//function for position query at view_JobManagement
exports.queryApplicationsByAID = function(AID){
	Cloud.Objects.query({
	    classname: 'APPLICATION',
	    limit:1000,
	    where:{
	    	AID:AID,
	    }
	}, function (e) {
	    if (e.success) {
	    	var index = 0;
	    	var APPLICATION_length = e.APPLICATION.length;
	    	
	    	
	    	Ti.App.fireEvent("queryApplicationsByAID",{
	    		applicationList:e.APPLICATION,
	    	});
	               
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
	    	HID:hid,
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
exports.createApplication = function(session_id,pid,username){
	Cloud.Objects.create({
		session_id:session_id,
		classname:'APPLICATION',
		fields:{
			AID:username,
			AStatus:"Processing",
			PID:pid,
		}
	},function(e){
        if (e.success) {
	        var application = e.APPLICATION[0];
	        alert('Success:\n' +
	            'id: ' + application.id + '\n' +
	            'AID' + application.AID + '\n' +
	            'PID' + application.PID + '\n' +
	            'AStatus' + application.AStatus + '\n' +
	            'created_at: ' + application.created_at);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
    });
};

