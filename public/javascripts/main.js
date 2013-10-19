$(document).ready(function(){
	var navActive=false;
	$('header').click(function(){
		
		if(navActive==false){
			$('nav').css('display','block');
			$('.buttonMobile').addClass('active');
			navActive=true;
		}
		else{
			$('nav').css('display','none');
			$('.buttonMobile').removeClass('active');
			navActive=false;
		}

	});

});