var fs = require('fs');

/*	
 *	upload.images - takes array of image blocks and creates json object while moving files
 *	from tmp/ folder to update/ folder. labels and cleans up accordingly.
 *
 *	NOTE:
 *			Needs Updates for form handling from the front end HTML Form structure change
 *			
 *
 */ 

exports.projectImages = function(files, callback){ //requires callback with imageBlocks Clean Object passed in
		//console.log("--FILES--");
		//console.log(files);

		//process and upload the images.
		var imageCount= 0;
		var imageBlocks = files.project_image_block;
		var totalImages = 0;

		imageBlocks.forEach(function(imageBlock){
			totalImages += imageBlock.length;
		});
		//console.log("Total Images: "+totalImages);
		imageBlocks.forEach(function(imageBlock,blockIndex){
		//for(var key in imageBlocks){
			//imageBlockIndex++; //keep track of our array index for imageBlocks[key]
			var imageIndex = 0;
			imageBlock.forEach(function(image,imageIndex){

				if(image.headers['content-type'].indexOf('image')>-1){
					//check if its an image
					//console.log('  uploaded : %s %skb : %s', image.originalFilename, image.size / 1024 | 0, image.path);
				 	var path = "./public/uploads/"+image.originalFilename;
				 	fs.rename("./"+image.path, path, function(err){
				 		if(err) throw err; //need to change so that it doesn't break on upload
				 		
				 		imageCount++;
				 		console.log(' moved : %s to %s',image.path, path);

				 		image.path = path.substring(8);	//reset our path to root of server
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
		}); //files.project_image_block.forEach
}



/* 
 *
 *		Upload Client Images
 *
 *
 */

exports.clientImage = function(files, callback){
	var image = files.image;
	var path = "./public/uploads/clients/"+image.originalFilename;

	fs.rename("./"+image.path, path, function(err){
			
			image.path = path.substring(8);
			image.type = image.headers['content-type'];
			image.name = image.originalFilename;

			delete image.ws;
			delete image.headers;
			delete image.originalFilename;

			callback(image);


	});
	
}