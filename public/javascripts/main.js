$(document).ready(function(){
        
        $('.new-clients').click(function(e){
                var num = $('#new-clients').children('section').length;        
                //console.log(num);
                var html = "<section>";
                        html +="<p><input type='text' name='new_client_name["+num+"]' placeholder='Enter Client Name'></p>";
                        html +="<p><input type='file' name='new_client_image["+num+"]'></p>";
                        html +="</section>";
                $('#new-clients').append(html);

        });
        $('.new-partners').click(function(e){
                var num = $('#new-partners').children('section').length;
                var html = "<section>";
                        html +="<p><input type='text' name='new_partner_name["+num+"]' placeholder='Enter Partner Name'></p>";
                        html +="</section>";
                $('#new-partners').append(html);

        });
        $('.new-technology').click(function(e){
                var num = $('#new-technology').children('section').length;
                var html = "<section>";
                        html +="<p><input type='text' name='new_technology_name["+num+"]' placeholder='Enter Technology Name'></p>";
                        html +="</section>";
                $('#new-technology').append(html);

        });
        $('.new-capabilities').click(function(e){
                var num = $('#new-capabilities').children('section').length;
                var html = "<section>";
                        html +="<p><input type='text' name='new_capabilities["+num+"][name]' placeholder='Enter Capability Name'></p>";
                        html +="<p><textarea type='text' name='new_capabilities["+num+"][text]' placeholder='Enter Capability Text'></textarea></p>";
                        html +="</section>";
                $('#new-capabilities').append(html);

        });
        $('.more-text').click(function(e){
                
                var obj = $('.text-block-0').clone(); //clone the obj we already have

                //count how many project-text-block are there?
                var textBlockNum = $('.project-text-block').length;
                //console.log("Number of Text blocks: "+textBlockNum);
                //manipulate it
                obj.removeClass().addClass('project-text-block text-block-'+textBlockNum);
                obj.find('.title').attr('name',"project_text["+textBlockNum+"][title]").val('');
                obj.find('.copy').attr('name',"project_text["+textBlockNum+"][text]").val('');
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
                //obj.find('input').attr("name", 'project_image_block['+imageBlockNum+'][]').removeClass().addClass('project-image-'+imageBlockNum);
                var inputs = obj.find('input');
                //for loop
                var counter=0;
                $.each(inputs,function(index,val){

                        $(inputs[index]).attr("name", "project_image_block["+imageBlockNum+"]["+index+"]").removeClass().addClass('project-image-'+imageBlockNum);

                });

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
                obj.find('.title').attr('name','project_info['+textBlockNum+'][title]').val('');
                obj.find('.copy').attr('name','project_info['+textBlockNum+'][text]').val('');
                $(".info-blocks").append(obj);

                //console.log(obj);

        }); //.more-text.click()

        $('.less-info').click(function(e){
                var infoBlocks = $('.project-info-block');

                if(infoBlocks.length>1){
                        infoBlocks[infoBlocks.length-1].remove();
                }else{
                        alert('What are you doing? At least have one bit of info here you clown');
                }
        });

        //if we type in a title
        $('.project_title').change(function(e){
        
                var slug = $(this).val().toLowerCase().replace(/ /g,'-'); //replace all spaces with -
                $('.project_slug').val(slug);
        });

        //if there is a change in the number of images in a block
        $(document).delegate('.num-images','change',function(e){

                //count how many file upload are there in that set 
                var inputs = $(this).parent().siblings('input[type=file]'); 
                var len = inputs.length;
                var inputClass = $(inputs[0]).attr('class');
                var blockNum = inputClass.substr(inputClass.length - 1);
                console.log(blockNum);
                //console.log(inputs[0]);

                var val = $(this).val();

                var numImages = val - len;

                var counter = len;

                if(numImages > 0){
                        
                        for(var i =0; i< numImages; i++){
                                var obj = $(inputs[0]).clone();
                                $(obj).attr('name', "project_image_block["+blockNum+"]["+counter+"]");
                                $(this).parent().parent().append(obj);
                                counter++;
                        }
                }else if(numImages < 0){

                        for(var i=len; i >= len+numImages; i--){
                                $(inputs[i]).remove();
                        }
                }

        });

        //delete item from row of items

        $('.edit-capabilities .delete').click(function(e){

                var form = $(this).parent();//get the form which is the parent
                form.attr('action', '/capabilities/delete');
                $(form).submit();
                //alert('yes');
        });

        $('.edit-clients .delete').click(function(e){

                var form = $(this).parent();//get the form which is the parent
                form.attr('action', '/clients/delete');
                $(form).submit();
                //alert('yes');
        });

        $('.edit-technologies .delete').click(function(e){


                var form = $(this).parent();//get the form which is the parent
                form.attr('action', '/technologies/delete');
                $(form).submit();
                //alert('yes');
        });

        $('.edit-partners .delete').click(function(e){

                var form = $(this).parent();
                form.attr('action','/partners/delete');
                $(form).submit();
        });

        // check for crucial values when submit the form
        $('.new_project').on('submit', function(e) {
                // alert('submitted!');
                valTitle = $('input[name="project_title"]').val();
                valSlug = $('input[name="project_slug"]').val();
                valLocation = $('input[name="project_location"]').val();
                valVideo = $('input[name="project_video"]').val();
                var checkInputFile = function() {
                        var checkArray = [];
                        $('input[type="file"]').each(function() {
                                if($(this).val().length > 1) {
                                        checkArray.push(true);
                                } else {
                                        checkArray.push(false);
                                }
                        });
                        if($.inArray(false, checkArray) === -1) {
                                // hooray, you shall pass
                                return true;
                        }
                };
                // checkInputFile();
                if(valTitle.length > 3 &&
                        valSlug.length > 3 &&
                        valLocation.length > 3 &&
                        valVideo.length > 3 &&
                        checkInputFile() == true) {
                        // submit
                } else {
                        e.preventDefault();
                        alert('You missed something.\nMake sure the basic info:\n–Title\n–Slug\n–Project Location\n–Video URL\nand all image fields are filled');
                }
        });



});