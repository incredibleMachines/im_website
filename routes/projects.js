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
		console.log(post);

		//process all this into the db
		if(post.technology_string)console.log('New Technology!');
		if(post.clients_string)console.log('New Clients!');
		if(post.capabilities_string)console.log('New Services!');
		if(post.project_featured === 'true') console.log('Project Featured');
		else console.log('Project Hidden');
		if(post.project_password && post.project_password_confirm){
			if(post.project_featured === 'true'){
				//featured projects cannot be passworded - they are featured
				//ignore password make project featured!
				console.log('Project is featured, ignoring password');
			}else{
				console.log('Password');
			}
			
		}
		//collect or data from the files, make the technology, clients and partners necessary
		//process project text arrays 

		var files = req.files; //the incoming files from the server
		//console.log(files); //see how f'd up html forms make arrays?
		var images;
		//custom image uploader 
		upload.images(files, function(imageBlocks){
			images = imageBlocks;
			console.log(images);

		});

		//store the images and the rest of the object in the db
		//res.redirect('/projects/'+post.project_slug+'/edit');
 		//res.location('/projects/'+post.project_slug+'/edit');

  		res.render('project', { title: 'Store Projects', slug: 'store-projects' });
	}
};