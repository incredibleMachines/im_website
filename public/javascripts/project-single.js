$(document).ready(function(){

	$('nav a').removeClass('active');

/* add header animation css after DOM has loaded */
$('header').css("-webkit-transition", "all 0.75s ease-in").css("-moz-transition", "all 0.75s ease-in").css("-o-transition", "all 0.75s ease-in").css("-ms-transition", "all 0.75s ease-in").css("transition", "all 0.75s ease-in");

/* 	setup photo zone borders - dynamic based on number of images in block */
$('.photo-block-multi').each(function(){
	if($(this).find('.img-wrap').length==2){
		$(this).find('.img-wrap').width( '49.75%');
		$(this).find('.img-wrap:first-child').css('padding-right', '.5%');
	}
	else if($(this).find('.img-wrap').length==3){
		$(this).find('.sm').width( '24.66%');
		$(this).find('.med').width( '49.66%');
		$(this).find('.img-wrap:first-child').css('padding-right', '.5%');
		$(this).find('.img-wrap:last-child').css('padding-left', '.5%');	
	}
	else if($(this).find('.img-wrap').length==4){
		$(this).find('.img-wrap').width( '24.61%');
		$(this).find('.img-wrap').css('padding-right', '.5%');
		$(this).find('.img-wrap:last-child').css('padding-right', '0');
	}
	$(this).css('padding-bottom','.25%');
});

/* video.js scaling and play functionality */
	videojs("project-video-1").ready(function(){

		var myPlayer = this;
		var amtScroll = 0;
  
/* setup initial video height and width */
		var aspect=16/9;
		if(window.innerHeight-$('.title-nav').height()<window.innerWidth*(1/aspect)){
		  	myPlayer.dimensions(100,window.innerHeight-$('.title-nav').height());
		  	myPlayer.width(myPlayer.height()*aspect);
		  	}
		else if(window.innerHeight<window.innerWidth*(1/aspect)){
		  	myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight-$('.title-nav').height());
		  	}
		else{
		  	myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
		  	}

/* position play button and center player */	  	
		$('.vjs-big-play-button').css("margin-top",(myPlayer.height()/2)-135/2);
		$('.project-vid').css("height",myPlayer.height());
		$('#project-video-1').css("margin-left",(window.innerWidth-myPlayer.width())/2);
	

/* resize player when window changes size */	
		userResize = function() {
		  	if(window.innerHeight-$('.title-nav').height()<window.innerWidth*(1/aspect)){
			  	myPlayer.dimensions(myPlayer.height()*aspect,window.innerHeight-$('.title-nav').height());
		  	}
		  	else if(window.innerHeight<window.innerWidth*(1/aspect)){
			  	myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight-$('.title-nav').height());
		  	}
		  	else{
				 myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
		
				  }
			$('.vjs-big-play-button').css("margin-top",(myPlayer.height()/2)-135/2);
			$('.project-vid').css("height",myPlayer.height());
			$('#project-video-1').css("margin-left",(window.innerWidth-myPlayer.width())/2)
		};
		
/* stop playback when scroll passes player bottom */	
		userScroll=function() {
			var amtScroll = $(window).scrollTop();
			if (amtScroll >= myPlayer.height()) {
				console.log('stop');
				myPlayer.pause();	
			} 
		};
		
		navOut = function(){	
			$('header').css("top",-100);
		}
		navIn = function(){
			$('header').css("top",0);
		}
		 
/* event listeners for video playback, resize and scrolling */			  
		window.addEventListener('resize', userResize, false);
		myPlayer.on("play", navOut);
		myPlayer.on("pause", navIn);
		myPlayer.on("ended", navIn);
		window.addEventListener('scroll',userScroll,false);
	});
});
