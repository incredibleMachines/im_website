$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Clients")').addClass('active');

	var clientSize=42;
	var clientTop=$('.client-detail').position().top;
	var expanded=false;
	var mobile=false;

	$('.cap-tech').css('z-index','10');
	$('.footer-bg-wrap').css('z-index','10');
	


	if($('#client-list').css('display')=='none'){
		mobile=true;
		$('.cap-tech').css('position','relative');
		$('.cap-tech').css('padding-top',30);
	}
	else{
		$('.client-detail').offset({top: -1000});
		$('.footer-bg-wrap').css('position','absolute');
		$('.footer-bg-wrap').css('width','100%');
	}


	userResize();
	
	$('body').click(function(e){

		if(mobile==false){
		var target=$(e.target);
		if(!target.is('nav')){
		if(target.is('.client')){
			if(expanded==false){
				expandDetail(target.find('h2').text(), target.attr('id'), $('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top')));
				expanded=true;
			}
		}

		else if(target.parents('.client').length>0){
			if(expanded==false){
				expandDetail(target.parents('.client').find('h2').text(), target.parents('.client').attr('id'), $('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top')));
				expanded=true;
			}
		}
		else if (target.parents('.close').length>0){
			if(expanded==true){
				contractDetail();
				expanded=false;
			}
		}

		else if(!target.is('.client-detail')&&target.parents('.client-detail').length==0){
			if(expanded==true){
				contractDetail();
				expanded=false;
			}
		}
	}
}

	});
	

	function userResize(){
		if(mobile==false){
		var detail=false;
		$('.client-detail').each(function(){
			var adjustedTop=clientTop;
			if($(this).position().top>0){
				detail=true;
				var hSize=parseInt($('.browser-client').css('font-size'));
				if($('.browser-client').height()>3*hSize){
					adjustedTop=clientTop+(2*parseInt($('.browser-client').css('line-height')));
					$(this).animate({top:adjustedTop},200);
				}
				else if($('.browser-client').height()>hSize+10){
					adjustedTop=clientTop+parseInt($('.browser-client').css('line-height'));
					$(this).animate({top:adjustedTop},200);
				}
				else {
					adjustedTop=clientTop;
					$(this).animate({top:adjustedTop},200);
				}
				$('.cap-tech').css({'top':adjustedTop+$(this).outerHeight()});
				$('.footer-bg-wrap').css({'top':adjustedTop+$(this).outerHeight()+$('.cap-tech').outerHeight()});
				console.log($('.browser-client').height());
			}
		});

		if(detail==false){
				$('.cap-tech').css({'top':clientTop+$('#client-list').outerHeight()});
				$('.footer-bg-wrap').css({'top':clientTop+$('#client-list').outerHeight()+$('.cap-tech').outerHeight()});
				expanded=false;
		}

		else{
			expanded=true;
		}


		$('.client h2').each(function(){
			$(this).css('font-size',clientSize);
			for(var i=0;i<parseInt($(this).css('font-size'));i++){
				if($(this).innerHeight()>clientSize+parseInt($(this).css('padding-top'))+parseInt($(this).css('padding-bottom'))+10){
					$(this).css('font-size',parseInt($(this).css('font-size'))-1);
				}
				else{
					break;
				}
			}
		});
	}
	}

	function expandDetail(clientName, clientSlug, gridHeight){
		if(mobile==false){
		$('.footer-bg-wrap').css('transition','top .5s');
		$('.cap-tech').css('transition','top .5s');	

		$('.cap-tech').delay(500).queue(function(){
			$(this).css({'top':clientTop+$('#'+clientSlug).outerHeight()});
			$(this).dequeue();
		});

		$('.footer-bg-wrap').delay(500).queue(function(){
			$(this).css({'top':clientTop+$('#'+clientSlug).outerHeight()+$('.cap-tech').outerHeight()});
			$(this).dequeue();
		});

		var adjustedTop=clientTop;

		$('#'+clientSlug).animate({top:clientTop},1000, function(){
			$('#client-list').css('top',-2000);	
			$('.client-detail').each(function(){
			if($(this).position().top>0){
				detail=true;
				var hSize=parseInt($('.browser-client').css('font-size'));
				if($('.browser-client').height()>3*hSize){
					adjustedTop=clientTop+(2*parseInt($('.browser-client').css('line-height')));
					$(this).animate({top:adjustedTop},200);
				}
				else if($('.browser-client').height()>hSize+20){
					adjustedTop=clientTop+parseInt($('.browser-client').css('line-height'));
					$(this).animate({top:adjustedTop},200);
				}
				else {
					adjustedTop=clientTop;
					$(this).animate({top:adjustedTop},200);
				}
				$('.cap-tech').css({'top':adjustedTop+$(this).outerHeight()});
				$('.footer-bg-wrap').css({'top':adjustedTop+$(this).outerHeight()+$('.cap-tech').outerHeight()});
			}
		});
		});
		
		$('.browser-client').delay(500).fadeOut(100,function(){
			$('.browser-client').text(clientName).fadeIn(100);
		});

		}


		}


	function contractDetail(){
		if(mobile==false){
		// $('.footer-bg-wrap').css('transition','top .5s');
		// $('.cap-tech').css('transition','top .5s');
	$('.client-detail').animate({top:-1000},1000);
	
	$('#client-list').delay(200).queue(function(){
		$(this).css('top',clientTop);
		$(this).dequeue();
	});	
		$('.browser-client').fadeOut(function(){
			$('.browser-client').text("Clients").fadeIn(0);
		});

		$('.cap-tech').delay(100).queue(function(){
			$(this).css({'top': clientTop+$('#client-list').outerHeight()});
			$(this).dequeue();
		});
		$('.footer-bg-wrap').delay(100).queue(function(){
			$(this).css({'top':clientTop+$('#client-list').outerHeight()+$('.cap-tech').outerHeight()});
			$(this).dequeue();
		});

				$('.client h2').each(function(){
					$(this).css('font-size',clientSize);
					for(var i=0;i<parseInt($(this).css('font-size'));i++){
						if($(this).innerHeight()>clientSize+parseInt($(this).css('padding-top'))+parseInt($(this).css('padding-bottom'))+10){
							$(this).css('font-size',parseInt($(this).css('font-size'))-1);
						}
						else{
							break;
						}
					}
			});
			}
		}

	  window.addEventListener('load',userResize, false);	
	  window.addEventListener('resize', userResize, false);
});
