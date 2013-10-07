$(document).ready(function(){

	$('.more-text').click(function(e){
		
		var obj = $('.text-block-0').clone();

		//count how many project-text-block are there?
		var textBlockNum = $('.project-text-block').length;
		//console.log("Number of Text blocks: "+textBlockNum);
		obj.removeClass().addClass('project-text-block text-block-'+textBlockNum);
		obj.find('.title').attr('name','project_text_title[]').val('');
		obj.find('.copy').attr('name','project_text[]').val('');
		$(".text-blocks").append(obj);

		//console.log(obj);

	}); //.more-text.click()

	$('.less-text').click(function(e){
		var textBlocks = $('.project-text-block');

		if(textBlocks.length>1){
			textBlocks[textBlocks.length-1].remove();
		}else{
			alert('You need at least one Text Box Captain');
		}
	});

	$('.more-images').click(function(e){

		var obj = $('.image-block-0').clone();
		var imageBlockNum = $('.project-image-block').length;

		obj.removeClass().addClass('project-image-block image-block-'+imageBlockNum);
		obj.find('input').attr("name", 'project_image_block_'+imageBlockNum+'[]').removeClass().addClass('project-image-'+imageBlockNum);
		$(".image-blocks").append(obj);

	}); //.more-images

	$('.less-images').click(function(e){
		var imageBlocks = $('.project-image-block');
		if(imageBlocks.length >1) imageBlocks[imageBlocks.length-1].remove();
		else alert('Hey, stop picking your nose and pay attention - you need at least one image block!');
	});


	$('.more-info').click(function(e){
		
		var obj = $('.info-block-0').clone();

		//count how many project-text-block are there?
		var textBlockNum = $('.project-info-block').length;
		//console.log("Number of Text blocks: "+textBlockNum);
		obj.removeClass().addClass('project-info-block info-block-'+textBlockNum);
		obj.find('.title').attr('name','project_info_title[]').val('');
		obj.find('.copy').attr('name','project_info[]').val('');
		$(".info-blocks").append(obj);

		//console.log(obj);

	}); //.more-text.click()

	$('.less-info').click(function(e){
		var infoBlocks = $('.project-info-block');

		if(infoBlocks.length>1){
			infoBlocks[infoBlocks.length-1].remove();
		}else{
			alert('What are you doing? At least have on bit of info here you clown');
		}
	});

	//if there is a change in the number of images in a block
	$(document).delegate('.num-images','change',function(e){

		//count how many file upload are there in that set 
		var inputs = $(this).parent().siblings('input[type=file]'); 
		var len = inputs.length;
		var inputClass = $(inputs[0]).attr('class');
		//console.log(inputClass);
		//console.log(inputs[0]);

		var val = $(this).val();

		var numImages = val - len;

		if(numImages > 0){
			
			for(var i =0; i< numImages; i++){
				var obj = $(inputs[0]).clone();
				$(this).parent().parent().append(obj);
			}
		}else if(numImages < 0){

			for(var i=0; i< Math.abs(numImages); i++){
				$(inputs[i]).remove();
			}
		}

	});



});