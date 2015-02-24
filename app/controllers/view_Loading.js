var args = arguments[0] || {};
var anim = Titanium.UI.createAnimation();
var matrix = Ti.UI.create2DMatrix();
var timeout;

rotateSpin(0);

function rotateSpin(degree){	
	matrix = matrix.rotate(5);	
	anim.transform = matrix;
	anim.duration = 20;
	$.loadingSpin.animate(anim); 
		
	timeout = setTimeout(function(){
		rotateSpin(++degree);
	},20);
}