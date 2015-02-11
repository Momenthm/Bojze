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



