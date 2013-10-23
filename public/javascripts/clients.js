$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Clients")').addClass('active');

	var clientSize=42;
	var clientTop=$('.client-detail').position().top;

	$('.cap-tech').css('z-index','10');
	$('.footer-bg-wrap').css('z-index','10');
	$('.footer-bg-wrap').css('position','absolute');
	$('.footer-bg-wrap').css('width','100%');
	$('.client-detail').offset({top: -1000});


	userResize();
	
	$('body').click(function(e){
		var target=$(e.target);
		if(target.is('.client')){
			expandDetail(target.find('h2').text(), target.attr('id'), $('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top')));
		}


		else if(target.parents('.client').length>0){
			expandDetail(target.parents('.client').find('h2').text(), target.parents('.client').attr('id'), $('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top')));
		}
		else if (target.parents('.close').length>0){
			contractDetail();
		}

		else if(!target.is('.client-detail')&&target.parents('.client-detail').length==0){
			contractDetail();
		}

	});
	

	function userResize(){
		var detail=false;
		$('.client-detail').each(function(){
			if($(this).position().top!=-1000){
				detail=true;
				$('.cap-tech').css({'top':clientTop+$(this).outerHeight()});
				$('.footer-bg-wrap').css({'top':clientTop+$(this).outerHeight()+$('.cap-tech').outerHeight()});
				console.log($(this).outerHeight());	
			}
		});

		if(detail==false){
				$('.cap-tech').css({'top':clientTop+$('#client-list').outerHeight()});
				$('.footer-bg-wrap').css({'top':clientTop+$('#client-list').outerHeight()+$('.cap-tech').outerHeight()});
		};


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

	function expandDetail(clientName, clientSlug, gridHeight){
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

		$('#'+clientSlug).animate({top:clientTop},1000, function(){
			$('#client-list').css('top',-2000);	
		});
		
		$('#client-grid h1').delay(500).fadeOut(100,function(){
			$('#client-grid h1').text(clientName).fadeIn(100);
		});
		}


	function contractDetail(){
		// $('.footer-bg-wrap').css('transition','top .5s');
		// $('.cap-tech').css('transition','top .5s');

		$('#client-list').css('top',clientTop);

		$('.client-detail').animate({top:-1000},1000);
		
		$('#client-grid h1').fadeOut(function(){
			$('#client-grid h1').text("Clients").fadeIn(0);
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

	  window.addEventListener('load',userResize, false);	
	  window.addEventListener('resize', userResize, false);
});
