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
var navigation = Alloy.Globals.navigation = Alloy.createController("navigation");
var menu = Alloy.Globals.menu = Alloy.createController("view_Menu");
$.win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];

var db = Alloy.Globals.Database;
var loadOnce = Ti.App.Properties.getBool('loadedOnce',false);
if(loadOnce == false){
	db.execute('CREATE TABLE IF NOT EXISTS POSITIONS(id TEXT, HID TEXT, startTime TEXT, endTime TEXT, created_at TEXT, salary INTEGER, vacancy INTEGER, description TEXT, photoURL TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS APPLICATIONS(id TEXT, HName TEXT, Address TEXT, PID TEXT, AStatus TEXT, created_at TEXT, user_id TEXT)');
	// db.execute('CREATE TABLE IF NOT EXISTS HOTELS(id TEXT, )')
	Ti.App.Properties.setBool('loadedOnce',true);
}

// Ti.UI.orientation = Ti.UI.PORTRAIT;
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
var init = function()
{
// App configuration
	var conf = {
		index: "view_Main",
		defaultOpenTransition: {transition: 'slideInFromRight', duration: 150},
		defaultBackTransition: {transition: 'slideInFromLeft', duration: 150},
		indexOptions: {
			topLevel: true,
			viewMode: 'nav',
			title: '',
			identifier: 'index',
		},
		historyLimit: 10,
		confirmOnExit: true,
	};
	navigation.init(conf);
	menu.init();
	// configuartion for distribution build
	if(Alloy.CFG.APPLICATION_BUILD == Alloy.CFG.BUILD.DISTRIBUTION)
	{


	
	}
	else
	{

	}
	
};


//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================
init();
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
Alloy.CFG.BUILD = {
	DISTRIBUTION: 0,
	DEVELOPMENT: 1
};

Alloy.CFG.APPLICATION_BUILD       = Alloy.CFG.BUILD.DISTRIBUTION;

//===========================================================================
// END OF EXPORTS
//===========================================================================

