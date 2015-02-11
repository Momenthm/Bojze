var Cloud = require("ti.cloud");

exports.userLogin = function(username,pwd){
	Cloud.Users.login({
	    login: username,
	    password: pwd,
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        
	        
	        Ti.App.fireEvent('loginSuccess',{
	        	username:username,
	        	pwd:pwd,
	        	sessionId : e.meta.session_id,
	        });
	        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

exports.queryPositions = function(){
	Cloud.Objects.query({
	    classname: 'POSITION',
	    limit:1000,
	    // page: 1,
	    // per_page: 10,
	    // where: {
	        // color: 'blue'
	    // }
	}, function (e) {
	    if (e.success) {
	        // alert('Success:\n' +
	            // 'Count: ' + e.POSITION.length);
	        Ti.App.fireEvent("queryPosition",{
	        	positionList:e.POSITION,
	        });    
	        
	        for (var i = 0; i < e.POSITION.length; i++) {
	            var position = e.POSITION[i];
	            // alert('salary: ' + position.Salary + '\n' +
	                // 'vacancy: ' + position.Vacancy + '\n' +
	                // 'description: ' + position.Description + '\n' +
	                // 'created_at: ' + position.created_at);
	        }
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

exports.queryHotelWithID = function(hid){
	var hotel ;
	Cloud.Objects.query({
	    classname: 'HOTEL',
	    limit:1000,
	     where: {
	         HID: hid
	    }
	}, function (e) {
	    if (e.success) {
	    	alert('length:'+e.HOTEL.length);
		hotel = e.HOTEL[0].Address;
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
	return hotel;
};

exports.queryHotelPhotoWithHID  = function (pid){
	
	var photoUrl;
	Cloud.Photos.query({
		photo_id:pid
		},function (e) {
    if (e.success) {
        if (e.photos.length == 0) {
            alert('No photos!');
        }
        else {
   
                Ti.API.info(e.photos[0].filename + ': '
                    + e.photos[0].urls.square_75);
     		photoUrl=e.photos[0].urls.square_75;
        }
    }
    else {
        alert(e);
    }
});
	return photoUrl;
};

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

