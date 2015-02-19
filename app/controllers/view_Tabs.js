var args = arguments[0] || {};

$.tab1.addEventListener('click',function(){
	Ti.App.fireEvent('toHome',{});	
});

$.tab2.addEventListener('click',function(){
	if(Ti.App.Properties.getString('login_user',"") != ""){
		Ti.App.fireEvent('toUserProfile',{});	
	}else{
		alert("You have not logged in yet!");	
	}
});

$.tab3.addEventListener('click',function(){
	if(Ti.App.Properties.getString('login_user',"") != ""){
		Ti.App.fireEvent('toJobManagement',{});
	}else{
		alert("You have not logged in yet!");	
	}
});


