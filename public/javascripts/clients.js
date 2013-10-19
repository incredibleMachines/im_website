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
	$('.client').click(function(){
		var clientName=$(this).find('h2').text();
		var clientSlug=$(this).attr('id');
		var gridHeight=$('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top'));
		$("#"+clientSlug).show(600,function(){
			$('.client').hide();
			$('.cap-tech').css('padding-top', $('.client-detail').height()+parseInt($('.cap-tech').css('margin-top')));
		});
		console.log(gridHeight);
		;
		$('#client-grid h1').fadeOut(function(){
			$('#client-grid h1').text(clientName).fadeIn();
		});
	});
	$('.close').click(function(){
		var closeDiv = $(this).parent();
		$('.client').fadeIn();
		$(this).parent().hide(600);
		$('.cap-tech').css('padding-top',0);
		
		$('#client-grid h1').fadeOut(function(){
			$('#client-grid h1').text("Clients").fadeIn();
		});
	});

	userResize= function(){

		if($('.client-detail').css('display')=='block'){
			$('.cap-tech').css({'padding-top': $('.client-detail').height()+parseInt($('.cap-tech').css('margin-top'))},500);
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

	  window.addEventListener('resize', userResize, false);
});
