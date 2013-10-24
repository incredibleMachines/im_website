$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Capabilities")').addClass('active');

	var headerHeight=$('header').height();
	var scrollLock=false;



	var aboutHeight, introHeight,
	transportHeight, transportOffset, 
	obsessedHeight, obsessedOffset, 
	produceHeight, produceOffset;

	userResize();


	if($('.about-block').css('position')!='relative'){
		$('#skills-section').css('top',aboutHeight);
		$('#skills ul li:nth-child(1) a').addClass('active');
		$('.about-skill').css('padding-top',headerHeight).css('margin-top',-headerHeight);
		$("#about-transport, #about-obsessed, #about-produce").css('position','absolute').height(aboutHeight);
		$('#about-transport').css('top',introHeight);
		$('#about-obsessed').css('top',transportHeight+introHeight);
		$('#about-produce').css('top',transportHeight+introHeight+obsessedHeight);
		$('#about').height(aboutHeight);
	}

	$('#about-skills').find('.about-skill:last-child').find('.skill-border').css('display','none');

	var zCount=100;
	$('.about-skill').each(function(){
		$(this).css('z-index',zCount);
		zCount-=1;
	})

	var lock=0;

/* scroll lock capabilities nav to top of screen */	
		function userScroll() {
			var amtScroll = $('body').scrollTop();

			if($('.about-block').css('position')!='relative'){
				if(amtScroll>aboutHeight+$('#about-skills').height()-$('#skills').height()){
					$('#skills').css('position','absolute').css('top',$('#about-skills').height()-$('#skills').height()+parseInt($('#about-skills').css('margin-bottom')));
					scrollLock=false;
				}
				
				else if(amtScroll>aboutHeight-$('header').height()){
					if(scrollLock==false){
						$('#skills').css('position','fixed').css('top',headerHeight);
						scrollLock=true;
					}
					var currentHeight=aboutHeight+headerHeight;
					var navHeight=$('#skills ul li').height();
					var skillCount=0;
					var offset=250;
					$('#skills ul li').each(function(){
						var skillNext=skillCount+1;
						currentHeight+=$('#about-skills .about-skill:nth-child('+skillCount+')').height();
						var nextHeight=currentHeight+$('#about-skills .about-skill:nth-child('+skillNext+')').height();
						if(amtScroll>currentHeight-offset&&amtScroll<nextHeight-(offset+navHeight)){
							$('#skills ul li.active').removeClass('active');
							$(this).addClass('active');
							return false;
						}

						offset+=navHeight;

						

						skillCount++;
					});
					
				}

			else if(amtScroll>transportHeight+introHeight+obsessedHeight+produceOffset){
				$('#about-produce').css('position','fixed').css('top',-produceOffset);
				if(scrollLock==true){
					$('#skills').css('position','absolute').css('top',0);
					scrollLock=false;
				}
				lock=3;
			}

			else if(amtScroll>transportHeight+introHeight+obsessedOffset){
				$('#about-obsessed').css('position','fixed').css('top',-obsessedOffset);
				if(lock==3){
					$('#about-produce').css('position','absolute').css('top',transportHeight+introHeight+obsessedHeight);
				}
				lock=2;
			}

			else if(amtScroll>introHeight+transportOffset){
					$('#about-transport').css('position','fixed').css('top',-transportOffset);
					if(lock==2){
						$('#about-obsessed').css('position','absolute').css('top',transportHeight+introHeight);
						
					}
					lock=1;
			}
			
			else{
				if(lock==1){
					$('#about-transport').css('position','absolute').css('top',introHeight);
					lock=0;
				}
			}
		}
		};

		function userResize(){
			if($('.about-block').css('position')!='relative'){
				
				$('#skills ul li:nth-child(1) a').addClass('active');
				$('.about-skill').css('padding-top',headerHeight).css('margin-top',-headerHeight);
				scrollLock=false;
				userScroll();

				$('#skills-section').css('top',aboutHeight);
				$("#about-transport, #about-obsessed, #about-produce").css('position','absolute');
				$('#about-transport').css('top',introHeight);
				$('#about-obsessed').css('top',transportHeight+introHeight);
				$('#about-produce').css('top',transportHeight+introHeight+obsessedHeight);
				$('#about').height(aboutHeight);
			

			introHeight=window.innerHeight;
			transportHeight=$('#about-transport img').height()+$('#about-transport p').outerHeight();
			console.log(transportHeight);
			console.log(window.innerHeight)
			obsessedHeight=$('#about-obsessed img').height()+$('#about-obsessed p').outerHeight();
			produceHeight=$('#about-produce img').height()+$('#about-produce p').outerHeight();

			if(transportHeight+$('header').height()>window.innerHeight){
				transportOffset=transportHeight-window.innerHeight;
			}

			else{
				transportOffset=0;
			}

			if(obsessedHeight+$('header').height()>window.innerHeight){
				obsessedOffset=obsessedHeight-window.innerHeight;
			}

			else{
				obsessedOffset=0;
			}

			if(produceHeight+$('header').height()>window.innerHeight){
				produceOffset=produceHeight-window.innerHeight;
			}

			else{
				produceOffset=0;
			}

			aboutHeight=introHeight+transportHeight+obsessedHeight+produceHeight;
		}

		else{
				$('#skills-section').css('position','relative').css('top','');
				$('#skills ul li a').removeClass('active');
				$('#skills').css('position','relative').css('top','');
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
		window.addEventListener('resize',userResize,false);
});
