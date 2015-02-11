var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_Login);
var navigation = Alloy.Globals.navigation;
// var Cloud = Alloy.Globals.Cloud;


var usernameInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var passwordInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var login = Ti.UI.createLabel({
	text:"Login",
	textAlign:"center",
	color:"#000000",
	// backgroundColor:"#FF00FF",
	font:{
		fontSize: 20,
		fontWeight: 'normal',
	}
});

Ti.App.addEventListener('loginSuccess',function(e){
	Ti.App.Properties.setString('login_user',e.username);
	Ti.App.Properties.setString('login_pwd',e.pwd);
	Ti.App.Properties.setString('login_session',e.sessionId);

	Ti.App.fireEvent('refreshLogin',{   	
	});
	   
	alert("loginSuccess");     
	navigation.back();
});

login.addEventListener('click',function(){
	// loginUser(usernameInput.value, passwordInput.value);
	Alloy.Globals.CloudManager .userLogin(usernameInput.value, passwordInput.value);
});

$.view_Login.add(usernameInput);
$.view_Login.add(passwordInput);
$.view_Login.add(login);

/*
function loginUser(username,pwd){
	Cloud.Users.login({
	    login: username,
	    password: pwd,
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        sessionId = e.meta.session_id;
	        // alert(e.meta.session_id);
	        // alert('Success:\n' +
	            // 'id: ' + user.id + '\n' +
	            // 'sessionId: ' + Cloud.sessionId + '\n' +
	            // 'first name: ' + user.first_name + '\n' +
	            // 'last name: ' + user.last_name);
	        Ti.App.Properties.setString('login_user',username);
	        Ti.App.Properties.setString('login_pwd',pwd);
	        Ti.App.Properties.setString('login_session',e.meta.session_id);
	        
	        Ti.App.fireEvent('refreshLogin',{   	
	        });
	        
	        navigation.back();
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}*/
