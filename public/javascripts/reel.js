$(document).ready(function(){

$('nav a').removeClass('active');

/* add header animation css after DOM has loaded */
$('header').css("-webkit-transition", "all 0.75s ease-in").css("-moz-transition", "all 0.75s ease-in").css("-o-transition", "all 0.75s ease-in").css("-ms-transition", "all 0.75s ease-in").css("transition", "all 0.75s ease-in");

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
		$('.project-vid').css("height",myPlayer.height());
		$('.vjs-big-play-button').css("position","absolute").css("top",(myPlayer.height()/2)-135/2).css("right",(myPlayer.width()/2)-135/2);
		if($('.project-vid').css('line-height')=='10px'){
			$('.project-vid').css('padding-top',$('header').height());
		}
		$('#project-video-1').css("margin-left",(window.innerWidth-myPlayer.width())/2);
	

/* resize player + buttons when window changes size */	
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
			// $('.vjs-big-play-button').height(myPlayer.height()/4).width(myPlayer.height()/4);
			// $('.vjs-big-play-button').css("margin-top",$('header').height()-((myPlayer.height()/2)+135/2));
			$('.project-vid').css("height",myPlayer.height());
			$('.vjs-big-play-button').css("position","absolute").css("top",(myPlayer.height()/2)-135/2).css("right",(myPlayer.width()/2)-135/2);
			if($('.project-vid').css('line-height')=='10px'){
				$('.project-vid').css('padding-top',$('header').height());
				$('header').css("top",0);
			}

			else{
				$('.project-vid').css('padding-top',0);
				if(!myPlayer.paused()){
					$('header').css("top",-100);
				}
			}
			$('#project-video-1').css("margin-left",(window.innerWidth-myPlayer.width())/2);
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
			if($('.project-vid').css('line-height')!='10px'){
				$('header').css("top",-100);
			}
		}
		navIn = function(){
			if($('.project-vid').css('line-height')!='10px'){
				$('header').css("top",0);
			}
		}
		 
/* event listeners for video playback, resize and scrolling */			  
		window.addEventListener('resize', userResize, false);
		myPlayer.on("play", navOut);
		myPlayer.on("pause", navIn);
		myPlayer.on("ended", navIn);
		window.addEventListener('scroll',userScroll,false);
	});
});
