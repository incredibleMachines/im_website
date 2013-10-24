$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Capabilities")').addClass('active');

	var headerHeight=$('header').height();
	var aboutHeight=$('#about').height()+parseInt($('#about').css("padding-top"))+parseInt($('#about').css("padding-bottom"));
	var scrollLock=false;
	if($('#about').css('position')=='fixed'){
		$('#skills-section').css('top',aboutHeight);
		$('#skills ul li:nth-child(1) a').addClass('active');
		$('.about-skill').css('padding-top',headerHeight).css('margin-top',-headerHeight);
	}

	$('#about-skills').find('.about-skill:last-child').find('.skill-border').css('display','none');

	var zCount=0;
	$('.about-skill').each(function(){
		$(this).css('z-index',zCount);
		zCount-=1;
	})

/* scroll lock capabilities nav to top of screen */	
		userScroll=function() {
			var amtScroll = $('body').scrollTop();

			if($('#about').css('position')=='fixed'){
				if(amtScroll>aboutHeight+$('#about-skills').height()-$('#skills').height()){
					$('#skills').css('position','absolute').css('top',$('#about-skills').height()-$('#skills').height()+parseInt($('#about-skills').css('margin-bottom')));
					scrollLock=false;
				}
				else if(amtScroll>(aboutHeight-headerHeight)){
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
			
			else{
				if(scrollLock==true){
						$('#skills').css('position','absolute').css('top',0);
						scrollLock=false;
					}
			}
		}
		};

		userResize=function(){
			if($('#about').css('position')=='fixed'){
				$('#skills-section').css('top',aboutHeight);
				$('#skills ul li:nth-child(1) a').addClass('active');
				$('.about-skill').css('padding-top',headerHeight).css('margin-top',-headerHeight);
				scrollLock=false;
				userScroll();
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
