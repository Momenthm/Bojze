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

var loginSuccess = function(e){
	if(e.from == "view_Login"){
		Ti.App.removeEventListener('loginSuccess',loginSuccess);
		Ti.App.fireEvent('refreshLogin',{  	
		});
		alert("loginSuccess");     
		navigation.back();
	}
};

Ti.App.addEventListener('loginSuccess',loginSuccess);

login.addEventListener('click',function(){
	// loginUser(usernameInput.value, passwordInput.value);
	Alloy.Globals.CloudManager.userLogin(usernameInput.value, passwordInput.value,"view_Login");

});
$.view_Login.add(usernameInput);
$.view_Login.add(passwordInput);
$.view_Login.add(login);
