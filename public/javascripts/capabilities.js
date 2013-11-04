$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Capabilities")').addClass('active');

	var headerHeight=$('header').height();
	var scrollLock=false;
	var aspect=1200/530;

	var aboutHeight;

	userResize();

	$('#about-skills').find('.about-skill:last-child').find('.skill-border').css('display','none');

	var zCount=100;
	$('.about-skill').each(function(){
		$(this).css('z-index',zCount);
		zCount-=1;
	})

	var lock=0;

	

/* scroll lock capabilities nav to top of screen */	
	function userScroll() {
		// var amtScroll = $('body').scrollTop();
		var amtScroll = $(window).scrollTop();
		console.log($(window).scrollTop());

		if($('.about-block').css('line-height')=='20px'){
			if(amtScroll>7.7*aboutHeight+$('#about-skills').height()-$('.skills').height()){
				$('.skills').css('position','absolute').css('top',$('#about-skills').height()-$('.skills').height()+parseInt($('#about-skills').css('margin-bottom')));
				scrollLock=false;
			}
			
			else if(amtScroll>7.7*aboutHeight-$('header').height()){
				if(scrollLock==false){
					$('.skills').css('position','fixed').css('top',headerHeight);
					scrollLock=true;
				}
				var currentHeight=7.7*aboutHeight+headerHeight;
				var navHeight=$('.skills ul li').height();
				var skillCount=0;
				var offset=250;
				$('.skills ul li').each(function(){
					var skillNext=skillCount+1;
					currentHeight+=$('#about-skills .about-skill:nth-child('+skillCount+')').height();
					var nextHeight=currentHeight+$('#about-skills .about-skill:nth-child('+skillNext+')').height();
					if(amtScroll>currentHeight-offset&&amtScroll<nextHeight-(offset+navHeight)){
						$('.skills ul li.active').removeClass('active');
						$(this).addClass('active');
						return false;
					}

					offset+=navHeight;
					skillCount++;
				});		
			}


			else if(amtScroll>7*aboutHeight){
				$('#produce-text').css('position','fixed').css('top',0);
				if(scrollLock==true){
					$('.skills').css('position','absolute').css('top',0);
					scrollLock=false;
				}
				lock=6;
			}

			else if(amtScroll>6*aboutHeight){
				$('#about-produce').css('position','fixed').css('top',0);
				if(lock==6){
					$('#produce-text').css('position','absolute').css('top',7*aboutHeight);
				}
				lock=5;
			}

			else if(amtScroll>4.5*aboutHeight){
				$('#obsessed-text').css('position','fixed').css('top',0);
				if(lock==5){
					$('#about-produce').css('position','absolute').css('top',6*aboutHeight);
				}
				lock=4;
			}

			else if(amtScroll>3.5*aboutHeight){
				$('#about-obsessed').css('position','fixed').css('top',0);
				if(lock==4){
					$('#obsessed-text').css('position','absolute').css('top',4.5*aboutHeight);
				}
				lock=3;
			}

			else if(amtScroll>2*aboutHeight){
					$('#transport-text').css('position','fixed').css('top',0);
					if(lock==3){
						$('#about-obsessed').css('position','absolute').css('top',3.5*aboutHeight);
						
					}
					lock=2;
			}

			else if(amtScroll>aboutHeight){
					$('#about-transport').css('position','fixed').css('top',0);
					if(lock==2){
						$('#transport-text').css('position','absolute').css('top',2*aboutHeight);
						
					}
					lock=1;
			}
			
			else{
				if(lock==1){
					$('#about-transport').css('position','absolute').css('top',aboutHeight);
					lock=0;
				}
			}
		}
	};

	function userResize(){
			
		if($('.about-block').css('line-height')=='20px'){
			aboutHeight=(window.innerHeight);


			
			$('.skills ul li:nth-child(1) a').addClass('active');
			$('.about-skill').css('padding-top',headerHeight).css('margin-top',-headerHeight);
			scrollLock=false;
			userScroll();


			$('#skills-section').css('position','absolute');
			$('#skills-section').css('top',7.7*aboutHeight);


			$("#about-transport, #about-obsessed, #about-produce").css('position','absolute');
			$('#about-intro').css('position','fixed');
			$('#about-transport').css('top',aboutHeight);
			$('#transport-text').css('top',2*aboutHeight);
			$('#about-obsessed').css('top',3.5*aboutHeight);
			$('#obsessed-text').css('top',4.5*aboutHeight);
			$('#about-produce').css('top',6*aboutHeight);
			$('#produce-text').css('top',7*aboutHeight);
			$('#about').height(7.5*aboutHeight);
			$('.about-text').height(aboutHeight);
			

			if(window.innerHeight<window.innerWidth*(1/aspect)){
				$('#about-transport img').width(window.innerWidth).height(window.innerWidth*(1/aspect));
				$('#about-transport img').css('left', 0);
				$('#about-obsessed img').width(window.innerWidth).height(window.innerWidth*(1/aspect));
				$('#about-produce img').width(window.innerWidth).height(window.innerWidth*(1/aspect));
				$('#about-produce img').css('left', 0);
			}

			else{
				$('#about-transport img').height(window.innerHeight).width(window.innerHeight*aspect);
				$('#about-transport img').css('left', (window.innerWidth-$('#about-transport img').width())/2);
				$('#about-obsessed img').height(window.innerHeight).width(window.innerHeight*aspect);
				$('#about-produce img').height(window.innerHeight).width(window.innerHeight*aspect);
				$('#about-produce img').css('left', (window.innerWidth-$('#about-produce img').width())/2);
			}
		}

		else{
				$('.about-text').css('position','relative').css('height','auto').css('top','').css('left','');
				$('#about-transport').css('position','relative').css('height','auto').css('top','').css('left','');
				$('.about-block').css('position','relative').css('top','').css('left','').css('width','100%');
				$('.about-block img').css('width','100%').css('height','auto').css('top','').css('left','');
				$('#skills-section').css('position','relative').css('top','');
				$('.skills').css('position','relative').css('top','');
				$('.skills ul li a').removeClass('active');
				$('#about').css('height','100%');
				scrollLock=true;
		}

		}

		$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 750);
	        return false;
	      }
	    }
	  });

		
		
		 
/* event listener for scrolling */			  

		window.addEventListener('scroll',userScroll,false);
		$(window).scroll(userScroll());
		window.addEventListener('resize',userResize,false);
});
