// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};



// managers
Alloy.Globals.CloudManager      = require("managers/CloudManager");
Alloy.Globals.commonFunc = require("managers/commonFunc");


//======[ configuration]======= 
Alloy.CFG.BUILD = {
	DISTRIBUTION: 0,
	DEVELOPMENT: 1
};

Alloy.CFG.APPLICATION_BUILD       = Alloy.CFG.BUILD.DISTRIBUTION;

