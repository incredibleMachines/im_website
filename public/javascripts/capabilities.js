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

/* scroll lock capabilities nav to top of screen */	
		userScroll=function() {
			var amtScroll = $(window).scrollTop();

			if($('#about').css('position')=='fixed'){
				console.log(aboutHeight+$('#about-skills').height());
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
					var skillCount=0;
					var offset=250;
					$('#skills ul li').each(function(){
						var skillNext=skillCount+1;
						currentHeight+=$('#about-skills .about-skill:nth-child('+skillCount+')').height();
						var nextHeight=currentHeight+$('#about-skills .about-skill:nth-child('+skillNext+')').height();
						if(amtScroll>currentHeight-offset&&amtScroll<nextHeight-offset){
							$('#skills ul li.active').removeClass('active');
							$(this).addClass('active');
							return false;
						}
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

		
		
		 
/* event listener for scrolling */			  

		window.addEventListener('scroll',userScroll,false);
		window.addEventListener('resize',userResize,false);
});
