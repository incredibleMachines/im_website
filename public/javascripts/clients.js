$(document).ready(function(){
	$('nav a').removeClass('active');
	$('nav a:contains("Clients")').addClass('active');

	$('.client-detail').hide();
	$('.client').click(function(){
		var clientName=$(this).find('h2').text();
		var clientSlug=$(this).attr('name');
		var gridHeight=$('#client-list').height()-2*parseInt($('.cap-tech').css('margin-top'));
		$("#"+clientSlug).show(600,function(){
			$('.cap-tech').animate({'padding-top': $('.client-detail').height()-gridHeight},500);
		});
		console.log(gridHeight);
		;
		$('#client-grid h1').fadeOut(function(){
			$('#client-grid h1').text(clientName).fadeIn();
		});
	});
	$('.close').click(function(){
		$(this).parent().hide(600);
		$('.cap-tech').animate({'padding-top':0},600);
		$('#client-grid h1').fadeOut(function(){
			$('#client-grid h1').text("Clients").fadeIn();
		});

		
	});
});
