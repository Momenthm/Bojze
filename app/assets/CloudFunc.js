var Cloud = require("ti.cloud");

exports.userLogin = function(username,pwd){
	Cloud.Users.login({
	    login: username,
	    password: pwd,
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        
	        // alert(e.meta.session_id);
	        // alert('Success:\n' +
	            // 'id: ' + user.id + '\n' +
	            // 'sessionId: ' + Cloud.sessionId + '\n' +
	            // 'first name: ' + user.first_name + '\n' +
	            // 'last name: ' + user.last_name);
	        // Ti.App.Properties.setString('login_user',username);
	        // Ti.App.Properties.setString('login_pwd',pwd);
	        // Ti.App.Properties.setString('login_session',e.meta.session_id);
	        
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
