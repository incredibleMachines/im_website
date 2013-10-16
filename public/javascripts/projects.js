$(document).ready(function(){

$('nav a').removeClass('active');
var topPadding=20;
	$('#portfolio').css('padding-top',$('header').height()+topPadding).css('margin-top',-$('header').height());
$('header.home').css({
				background: 'transparent',
				top: '',
				bottom: 0,
				transition: 'background 0.4s ease-in'
			});


videojs("intro-video-1").ready(function(){
	var myPlayer = this;
  var amtScroll = 0,
  	sH = window.innerHeight,
	sW = window.innerWidth;

/*   var aspect=myPlayer.width()/myPlayer.height(); */
var aspect=16/9;
  console.log(aspect);
  	if(window.innerHeight<window.innerWidth*(1/aspect)){
	  	myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
	  	$('#intro-video-1').css("left",0);
	  	$('#intro-video-1').css("top",(window.innerHeight-myPlayer.height())/2);
  	}
  	else{
	  	myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight);
	  	$('#intro-video-1').css("top",0);
	  		$('#intro-video-1').css("left",(window.innerWidth-myPlayer.width())/2);
	  	}
  console.log(window.innerHeight-$('.title-nav').height());

$('.intro-vid').css("height",myPlayer.height());

	
	
	userResize = function() {
  	if(window.innerHeight<window.innerWidth*(1/aspect)){
	  	myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
	  	$('#intro-video-1').css("left",0);
	  	$('#intro-video-1').css("top",(window.innerHeight-myPlayer.height())/2);
  	}
  	else{
		 myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight);
		 $('#intro-video-1').css("top",0);
		 	  		$('#intro-video-1').css("left",(window.innerWidth-myPlayer.width())/2);

	}
		  
	console.log(myPlayer.width(),myPlayer.height(), window.innerHeight);
	$('.intro-vid').css("height",myPlayer.height());
	sH = window.innerHeight;
	sW = window.innerWidth;

	
	};
	
	userScroll=function() {
		var amtScroll = $(window).scrollTop();
		if (amtScroll >= sH-70) {
			$('header.home').css({
				top: 0,
				background: 'rgb(0,0,0)',
				transition: 'background 0.4s ease-in'
			});
			$('nav a:contains("Featured Work")').addClass('active');
			$('.logoHome').fadeIn();
		} 
		else {
			console.log('scrolling up');
			// remove top:0
			$('header.home').css({
				background: 'transparent',
				top: '',
				bottom: amtScroll,
				transition: 'background 0.4s ease-in'
			});
			$('nav a').removeClass('active');
			$('.logoHome').fadeOut();
		}
	};
	 
			  
  window.addEventListener('resize', userResize, false);
  window.addEventListener('scroll',userScroll,false);
});

});
