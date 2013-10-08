var fs = require('fs');

/*	
 *	upload.images - takes array of image blocks and creates json object while moving files
 *	from tmp/ folder to update/ folder. labels and cleans up accordingly.
 *
 *	NOTE:
 *			There is a little bit of oddness with the file arrays created in the DOM, well call 
 *			this code BETA still, any input is appreciated greatly. Thanks.
 *
 */ 

exports.projectImages = function(files, callback){ //requires callback with imageBlocks Clean Object passed in
		//console.log("--FILES--");
		//console.log(files);

		var imageBlocks = {},//formatting them images nicely
		totalImages=0,
		numBlocks = 0;;//images uploading
		for(var key in files){
			if(files.hasOwnProperty(key)) {
				numBlocks++;
				if(files[key][0].length>0){ //multiple array elements

					//this is a hack - the dom returns files[0] when we have more than one 
					//element in our array not really sure how else to handle this.. have fun
   					//can't say files[key].length because in both cases they equal 1


   					console.log(key+' has '+files[key][0].length+' images'); //log them
   					totalImages+=files[key][0].length;
   					imageBlocks[key] = files[key][0]; //populate json array with correct key
 		 			
 		 		}else{ //only one array element

 		 			console.log(key+' has '+files[key].length+' images'); //log them
   					totalImages+=files[key].length;
   					imageBlocks[key] = files[key]; //populate json array with correct key
 		 		}
 		 	}
		}
		console.log('Total Number of Images Uploaded: '+totalImages);
		console.log('Total Number of Image Blocks: '+numBlocks);
		//process and upload the images.
		var imageCount= 0;
		for(var key in imageBlocks){
			//imageBlockIndex++; //keep track of our array index for imageBlocks[key]
			var imageIndex = 0;
			imageBlocks[key].forEach(function(image){

				if(image.headers['content-type'].indexOf('image')>-1){
					//check if its an image
					//console.log('  uploaded : %s %skb : %s', image.originalFilename, image.size / 1024 | 0, image.path);
				 	var path = "./public/uploads/"+image.originalFilename;
				 	fs.rename("./"+image.path, path, function(err){
				 		if(err) throw err; //need to change so that it doesn't break on upload
				 		
				 		imageCount++;
				 		console.log(' moved : %s to %s',image.path, path);

				 		image.path = path;	//reset our path to root of server
				 		image.type = image.headers['content-type']; //pull out content-type for mime data
				 		image.name = image.originalFilename; //generally the same - but ensure they are

				 		//remove the stuff we don't need any more
				 		delete image.originalFilename;
				 		delete image.headers;
				 		delete image.ws;
				 		//console.log(image);

				 		if(totalImages === imageCount){
				 			callback(imageBlocks);//call our function and pass our json object
				 		}
				 	});
			 	}else{
			 		//if its not an image delete it
			 		imageCount--;
			 		console.log(key+"["+counter+"] is not an image");
			 		//remove it from our server
			 		fs.unlink(image.path,function(err){
			 			if(err) throw err;
			 			console.log('deleted file');
			 			imageBlocks[key].splice(counter,1);//remove this element from the array its garbage and we can't use it
			 			if(totalImages === imageCount){
				 			callback(imageBlocks); //call our function and pass our json object
				 		}
			 		})
			 	}//end ifelse

			 	imageIndex++; //keep track of our array index for imageBlocks[key][imageIndex]
			}); //end imageBlocks[key].forEach(function(image){});
		} //end (var key in imageBlocks)
}



/* 
 *
 *		Upload Client Images
 *
 *
 */

exports.clientImage = function(files, callback){
	
}