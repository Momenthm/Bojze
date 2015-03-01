var args = arguments[0] || {};

// Extend the demo_view controller
exports.baseController = "view_Base";
$.main.add($.view_UserProfileEdit);
var navigation = Alloy.Globals.navigation;

var user = Ti.App.Properties.getObject('login_userObject',null);

if(user != null){
	$.NameContent.value = user.first_name+" "+user.last_name;
	if(user.email != null && user.email != ""){
		$.emailContent.value = user.email;
	}else{
		$.emailContent.value = "";
	}
	
	if(user.custom_fields != null){
		$.phoneContent.value = user.custom_fields.Phone;
	}else{
		$.phoneContent.value = "";
	}
	
	if(user.custom_fields != null){
		$.finContent.value = user.custom_fields.IC;
	}else{
		$.finContent.value = "";
	}
}

var takePhoto = function(){
	Titanium.Media.showCamera({
	    success:function(event)
	    {
	         var image = event.media;
	       // set image view
	         $.statueImage.image = image;
	         // var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "savedImage.jpg");
				// f.write(image);
	    },
	    cancel:function()
	    {
	 
	    },
	    error:function(error)
	    {
	         // create alert
	         var a = Titanium.UI.createAlertDialog({title:'Camera'});
	         // set message
	         if (error.code == Titanium.Media.NO_CAMERA)
	         {
	            a.setMessage('Device does not have video recording capabilities');
	         }
	         else
	         {
	            a.setMessage('Unexpected error: ' + error.code);
	         }
	 
	                // show alert
	                a.show();
	            },
	            saveToPhotoGallery:true,
	            allowImageEditing:true
	});
};

var Gallary = function(){
	Titanium.Media.openPhotoGallery({
		success:function(event)
	    {
	         var image = event.media;
	       // set image view
	         $.statueImage.image = image;
	         // var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "savedImage.jpg");
				// f.write(image);
	    },
	    cancel:function()
	    {
	 
	    },
	    error:function(error)
	    {
	        a.setMessage('Unexpected error: ' + error.code);
	    },
	});
};

$.fromCamera.addEventListener('click',takePhoto);

$.fromGallary.addEventListener('click',Gallary);
