var args = arguments[0] || {};

$.tab1.addEventListener('click',function(){
	Ti.App.fireEvent('toHome',{});	
});

$.tab2.addEventListener('click',function(){
	Ti.App.fireEvent('toUserProfile',{});	
});

$.tab3.addEventListener('click',function(){
	Ti.App.fireEvent('toJobManagement',{});	
});


