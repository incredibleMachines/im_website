var upload = require('../functions/upload'); //back a folder
/*
 * GET projects
 */

exports.featured = function(db){
	return function(req, res){
		//db query for all featured projects
		var projects = [];

		//query 

		//array push each project 
  		res.render('projects', { title: 'Featured Projects' , slug: 'projects', projects: projects});
	}
};

/*
 * GET project/:name
 */

exports.single = function(db) {
	return function(req,res) {
		var name = req.params.name;
		//query the database and load all the info

		res.render('project', {title: 'Project Title', slug: 'single-project '+name });
	}
}

/*
 * GET project/:name/:action
 */

exports.action = function(db) {

	return function(req,res) {
		var action = req.params.action;

		res.render('project', {title: 'Project Action', slug: 'project-'+action});
	}
}

/*
 * GET project/:name/:action
 */

exports.edit = function(db){
	return function(req, res){
  		res.render('projects_edit', { title: 'Edit Projects', slug: 'edit-projects'});
	}
};


/*
 * POST project/:name/:action
 */
exports.store = function(db){
	return function(req, res){
		console.log("+++++++++++POST+++++++++++++");
		var post = req.body; //this is our form data
		console.log(post); //fixed arrays by adding indexs to items

		var files = req.files; //the incoming files from the server
		console.log(files); //fixed arrays by adding indexs to items

		//first get a post id & object to store data

		var projectsDB = db.get('projects');
		var clientsDB = db.get('clients'); 


		var obj = {
						title: post.project_title,
						slug: post.project_slug,
						video_url: post.project_video,
						imageBlocks: {},
						textBlocks: {},
						infoBlocks: {},
						featured: (post.project_featured === 'true') ? true : false,
						password: (post.project_password) ? post.project_password : null,
						capabilities:[],
						clients:[],
						techologies:[],
						partners:[]
				};

		projectsDB.insert(obj, function(err,doc){

			if(err) throw err;

			//console.log(doc._id); //
			//console.log(obj); //doc id automatically inserted into the obj

		});

		if(post.new_client_name){

			//process new clients
			//get and upload image
			//remove from file obj
			var client_image_array;
			if(files.new_client_image){
				client_image_array = files.new_client_image; //store the info
				delete files.new_client_image; //remove the files from our array and pass it along 
				
				if(post.new_client_name[0].length>0){ //multiple array elements
					//assume the image # is correct - do this on the front end
					//upload image
					console.log('stuff');


				}else{
					//only one new client
					console.log('+++++++++HERE+++++++++');
					var image = files.new_client_image[0];
					var client = post.new_client_name[0];
				 	var path = "./public/uploads/clients/"+image.originalFilename;
				 	fs.rename("./"+image.path, path, function(err){
				 		console.log(' moved : %s to %s',image.path, path);

				 	});					
				}
			}

		}

		if(post.new_partner_name){
			
			//process partners
		}

		if(post.new_capabilities_name){
			//
		}

		if(post.new_technology_name){
			//
		}


		//check for new clients &technology & capabilities & partners 

		//DEPRECATED 
		// if(post.technology_string)console.log('New Technology!');
		// if(post.clients_string)console.log('New Clients!');
		// if(post.capabilities_string)console.log('New Services!');
		// if(post.project_featured === 'true') console.log('Project Featured');
		// else console.log('Project Hidden');
		// if(post.project_password && post.project_password_confirm){
		// 	if(post.project_featured === 'true'){
		// 		//featured projects cannot be passworded - they are featured
		// 		//ignore password make project featured!
		// 		console.log('Project is featured, ignoring password');
		// 	}else{
		// 		console.log('Password');
		// 	}
			
		// }
		//collect or data from the files, make the technology, clients and partners necessary
		//process project text arrays 


		var images;
		//custom image uploader 
		// upload.projectImages(files, function(imageBlocks){
		// 	images = imageBlocks;
		// 	console.log(images);

		// });

		//store the images and the rest of the object in the db
		//res.redirect('/projects/'+post.project_slug+'/edit');
 		//res.location('/projects/'+post.project_slug+'/edit');

  		res.render('project', { title: 'Store Projects', slug: 'store-projects' });
	}
};