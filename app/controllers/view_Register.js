/*
 * 
 * 
 * 
 * Title:
 * Description: 
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	

var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_Register);
var navigation = Alloy.Globals.navigation;

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

var passwordConfirm = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var regist = Ti.UI.createLabel({
	text:"regist",
	textAlign:"center",
	color:"#000000",
	// backgroundColor:"#FF00FF",
	font:{
		fontSize: 20,
		fontWeight: 'normal',
	}
});

var registSuccess = function(e){
	Ti.App.addEventListener('registSuccess',registSuccess);
	Ti.App.fireEvent('refreshLogin',{  	
	});
	alert("registSuccess");     
	navigation.back();
};

Ti.App.addEventListener('registSuccess',registSuccess);

regist.addEventListener('click',function(){
	// loginUser(usernameInput.value, passwordInput.value);
	Alloy.Globals.CloudManager.userRegist(usernameInput.value, passwordInput.value, passwordConfirm.value);
});

$.view_Register.add(usernameInput);
$.view_Register.add(passwordInput);
$.view_Register.add(passwordConfirm);
$.view_Register.add(regist);

//===========================================================================
// END OF PROPERTIES
//===========================================================================	
//===========================================================================
// END OF PROPERTIES
//===========================================================================	


//===========================================================================
// HANDLERS
//===========================================================================	

//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// SERVICE RESPONSES
//===========================================================================	

//===========================================================================
// END OF SERVICE RESPONSES
//===========================================================================	


//===========================================================================
// SERVICE REQUESTS
//===========================================================================	

//===========================================================================
// END OF SERVICE REQUESTS
//===========================================================================	


//===========================================================================
// FUNCTIONS
//===========================================================================


//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================
//===========================================================================
// END OF LOGICS
//===========================================================================

//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================
//======[ configuration]======= 

//===========================================================================
// END OF EXPORTS
//===========================================================================

