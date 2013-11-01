$(document).ready(function(){

	var videoPlay=true;

$('nav a').removeClass('active');
$('nav a:contains("Featured Work")').addClass('active');

/* add header animation css after DOM has loaded */
$('header').css("-webkit-transition", "all 0.75s ease-in").css("-moz-transition", "all 0.75s ease-in").css("-o-transition", "all 0.75s ease-in").css("-ms-transition", "all 0.75s ease-in").css("transition", "all 0.75s ease-in");

/* 	setup photo zone borders - dynamic based on number of images in block */
$('.project-text-titled').first().find('.title').hide();

$('.photo-block-multi').each(function(){
	/*Single Image */
	if($(this).find('.img-wrap').length==1){
		$(this).find('.img-wrap').width( '100%');
	}

	/*Two Images */
	else if($(this).find('.img-wrap').length==2){
		$(this).find('.img-wrap').width( '49.85%');
		$(this).find('.img-wrap:first-child').css('padding-right', '.3%');
	}

	/*Three Images */
	else if($(this).find('.img-wrap').length==3){

	 $(this).find('.img-wrap').each(function(){
			if($(this).attr('data-image-size')=='1'){
				$(this).width('24.85%');
			}
			else{
				$(this).width( '49.7%');
			}
		});
		$(this).find('.img-wrap:first-child').css('padding-right', '.3%');
		$(this).find('.img-wrap:last-child').css('padding-left', '.3%');	
	}

	/*Four Images */
	else if($(this).find('.img-wrap').length==4){
		$(this).find('.img-wrap').width( '24.61%');
		$(this).find('.img-wrap').css('padding-right', '.25%');
		$(this).find('.img-wrap:last-child').css('padding-right', '0');
	}
	/*Vertical Spacing for ImageBlocks */

});

/* video.js scaling and play functionality */
	videojs("project-video-1").ready(function(){
		var myPlayer = this;
		var amtScroll = 0;
  
/* setup initial video height and width */
		var aspect=16/9;
		var aspectPoster=1920/740;
		if($('#project-video-1 video').attr('data-video-file')=='none'){
			videoPlay=false;
			$('.vjs-big-play-button').hide();
		}
		myPlayer.height(window.innerHeight-$('.title-nav').height());
		userResize();

/* resize player + buttons when window changes size */	
		function userResize() {
		
		  	if(window.innerHeight-$('.title-nav').height()<window.innerWidth*(1/aspect)){
			  	myPlayer.dimensions(myPlayer.height()*aspect,window.innerHeight-$('.title-nav').height());
			  	if(myPlayer.height()>window.innerWidth*(1/aspectPoster)){
			  		$('.poster-image').width('auto').height(myPlayer.height());
			  		console.log('one');
			  	}
			  	else{
			  		$('.poster-image').width(window.innerWidth).height('auto');
			  		console.log('two');
			  	}
	  			
		  	}
		  	else if(window.innerHeight<window.innerWidth*(1/aspect)){
			  	myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight);
		  		$('.poster-image').width('auto').height(myPlayer.height());
	  			
		  	}
		  	else{
				 myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
				 $('.poster-image').width('auto').height(myPlayer.height());
				 console.log('three');	  			
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

					$('.project-vid').css("height",myPlayer.height());
		$('.vjs-big-play-button').css("position","absolute").css("top",(myPlayer.height()/2)-135/2).css("right",(myPlayer.width()/2)-135/2);
		if($('.project-vid').css('line-height')=='10px'){
			$('.project-vid').css('padding-top',$('header').height());
		}
		$('#project-video-1').css("margin-left",(window.innerWidth-myPlayer.width())/2);

		
		$('.intro-vid').css("height",myPlayer.height());
			$('#project-video-1').css("margin-left",(window.innerWidth-myPlayer.width())/2);
			$('.poster-wrap').height(myPlayer.height());
		};
		
/* stop playback when scroll passes player bottom */	
		function userScroll() {
			var amtScroll = $(window).scrollTop();
			if (amtScroll >= myPlayer.height()) {
				
				myPlayer.pause();	
			} 
		};
		
		function navOut(){	
			if(videoPlay==true){
				if($('.project-vid').css('line-height')!='10px'){
					$('header').css("top",-100);
				}
				$('.poster-wrap').fadeOut(200);
			}
		}
		function navIn() {
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

$('.previous-proj button.left').hover(function(){
	if($('.logoHome').css('display')=='block'){
	$('.previous-proj .nav-label-prev').fadeIn(50);
}
}, function(){
	$('.previous-proj .nav-label-prev').fadeOut(50);
});

$('.next-proj button.right').hover(function(){
	if($('.logoHome').css('display')=='block'){
	$('.next-proj .nav-label-next').fadeIn(50);
}
}, function(){
	$('.next-proj .nav-label-next').fadeOut(50);
});

	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 500);
	        return false;
	      }
	    }
	  });
});
