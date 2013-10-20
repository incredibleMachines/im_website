$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Clients")').addClass('active');

	var clientSize=42;

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

	$('.client-detail').hide();
	
	$('body').click(function(e){
		var target=$(e.target);
		console.log(target);
		if(target.is('.client')){
			var clientName=target.find('h2').text();
			var clientSlug=target.attr('id');
			var gridHeight=$('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top'));
			$("#"+clientSlug).show(600,function(){
				$('.client').hide();
				$('.cap-tech').css('padding-top', $("#"+clientSlug).outerHeight()+30);
				$(window).scrollTop(0);
			});
			console.log(gridHeight);
			;
			$('#client-grid h1').fadeOut(function(){
				$('#client-grid h1').text(clientName).fadeIn();
			});
		}

		else if(target.parents('.client').length>0){
			var clientName=target.parents('.client').find('h2').text();
			var clientSlug=target.parents('.client').attr('id');
			var gridHeight=$('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top'));
			$("#"+clientSlug).show(600,function(){
				$('.client').hide();
				$('.cap-tech').css('padding-top', $("#"+clientSlug).outerHeight()+30);
				$(window).scrollTop(0);
			});
			console.log(gridHeight);
			;
			$('#client-grid h1').fadeOut(function(){
				$('#client-grid h1').text(clientName).fadeIn();
			});
		}
		else if (target.parents('.close').length>0){
			$('.client').fadeIn();
			$('.client-detail').hide(600);
			$('.cap-tech').css('padding-top',30);
			
			$('#client-grid h1').fadeOut(function(){
				$('#client-grid h1').text("Clients").fadeIn();
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
		else if(!target.is('.client-detail')&&target.parents('.client-detail').length==0){
			$('.client').fadeIn();
			$('.client-detail').hide(600);
			$('.cap-tech').css('padding-top',30);
			
			$('#client-grid h1').fadeOut(function(){
				$('#client-grid h1').text("Clients").fadeIn();
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
	});
	

	userResize= function(){

		$('.client-detail').each(function(){
			if($(this).css('display')=='block'){
				$('.cap-tech').css('padding-top', $(this).outerHeight()+30);
			}
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

	  window.addEventListener('resize', userResize, false);
});
