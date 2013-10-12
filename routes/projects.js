var upload = require('../functions/upload'); //back a folder
var fs = require('fs');

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
		var name = req.params.name;
		console.log(name);
		var projects = db.get('projects');

		projects.find({ slug: name}, function(err,docs){
			console.log(docs[0])
			res.render('project_'+action, {title: 'Project Action', slug: 'project-'+action, project: docs[0]});

		});


	}
}

/*
 * GET project/:name/:action
 */

exports.edit = function(db){
	return function(req, res){
		var data = {};

		var clientsDB = db.get('clients'); 
		var partnersDB = db.get('partners');
		var capabilitiesDB = db.get('capabilities');
		var techologiesDB = db.get('techologies');

		//find all the data we need - asynch and then render the page when its all ready.
		clientsDB.find({},function(err,clients_docs){

			data.clients = clients_docs;
			partnersDB.find({},function(err,partners_docs){
				data.partners = partners_docs;
				capabilitiesDB.find({},function(err,capabilities_docs){
					data.capabilities = capabilities_docs;
					techologiesDB.find({},function(err,technology_docs){
						data.technology = technology_docs;

						res.render('projects_edit', { title: 'Edit Projects', slug: 'edit-projects', data: data});

					});
				});
			});

		})

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
		var partnersDB = db.get('partners');
		var capabilitiesDB = db.get('capabilities');
		var techologiesDB = db.get('techologies');


		var storedClients = []; //holding the data to our operations



		var project_obj = {
						title: post.project_title,
						slug: post.project_slug,
						video_url: post.project_video,
						imageBlocks: [],
						textBlocks: (post.project_text)? post.project_text : {},
						infoBlocks: (post.project_info)? post.project_info : {},
						featured: (post.project_featured === 'true') ? true : false,
						password: (post.project_password) ? post.project_password : null,
						capabilities:(post.capabilities)?post.capabilities : [],
						clients:(post.clients)? post.clients: [],
						technologies: (post.technology)? post.technology : [],
						partners: (post.partners) ? post.partners : [],
						timestamp: new Date()
				};

		projectsDB.insert(project_obj, function(err,doc){

			if(err) throw err;
			console.log(project_obj); //doc id automatically inserted into the obj
			//create process function which adds all the information into our project 
			//console.log(project_obj._id);
			console.log(project_obj._id.toString());
		});

		if(post.new_client_name && files.new_client_image){

			//process new clients
			//get and upload image
			//remove from file obj
			var client_images = files.new_client_image; //store the info
			delete files.new_client_image; //remove the files from our array and pass it along 
			var client_count = 0;

			//for(var i =0; i<client_images.length; i++){
			client_images.forEach(function(image,i){
				//var image = client_images[i];
				//console.log(image);
				var client = post.new_client_name[i];
				var path = "./public/uploads/clients/"+image.originalFilename;
				fs.rename("./"+image.path, path, function(err){
					if(err) throw err;
					console.log(' moved : %s to %s',image.path, path);
					//console.log(image);
					image.path = path;	//reset our path to root of server
			 		image.type = image.headers['content-type']; //pull out content-type for mime data
			 		image.name = image.originalFilename; //generally the same - but ensure they are

			 		//remove the stuff we don't need any more
			 		delete image.originalFilename;
			 		delete image.headers;
			 		delete image.ws;

			 		var client_obj = {name: client, image: image, projects: [{_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }], capabilities:[] };

					clientsDB.insert(client_obj, function(err,doc){

						if(err) throw err;
						//console.log(client_obj); //doc id automatically inserted into the obj
						//storedClients.push(client_obj);

						//place callback here for function to store information back into the project

						var update_obj = {$push: {clients: {_id: client_obj._id.toString(), name: client_obj.name } }};
						projectsDB.update(project_obj._id, update_obj,function(err,doc){
							if(err) throw err;
						});
					});

				});//fs.rename end
			});//each

		}

		if(post.new_partner_name){
			
			//process partners

			//partnersDB = 

			post.new_partner_name.forEach(function(val,i){

				var partner_obj = {name: val, projects:[{_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }]};
				partnersDB.insert(partner_obj,function(err,doc){
					if(err) throw err;
					var update_obj = {$push: {partners: {_id:partner_obj._id.toString(), name: partner_obj.name  } } };
					projectsDB.update(project_obj._id,update_obj,function(err,doc){
						if(err) throw err;
					})

				});


			});

		}

		if(post.new_capabilities){
			//

			post.new_capabilities.forEach(function(v,i){
				var capability_obj = v;
				capability_obj.projects = [{_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }];

				capabilitiesDB.insert(capability_obj,function(err,doc){
					if(err) throw err;
					var update_obj = {$push:{capabilities: {_id:capability_obj._id.toString(), name: capability_obj.name, text: capability_obj.text } } };
					projectsDB.update(project_obj._id,update_obj,function(err,doc){
						if(err) throw err;
					});
				});

			});
		}

		if(post.new_technology_name){
			//
			post.new_technology_name.forEach(function(v,i){
				
				var technology_obj = {name:v, projects:[{_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }]};
				techologiesDB.insert(technology_obj,function(err,doc){
					if(err) throw err;
					var update_obj = {$push:{technologies: {_id:technology_obj._id.toString(), name: technology_obj.name } }}
					projectsDB.update(project_obj._id,update_obj,function(err,doc){
						if(err) throw err;
					});

				});
			});

		}

		//custom image uploader 
		upload.projectImages(files, function(images){
			//console.log(images);
			var update_obj = {$set: {imageBlocks: images}};
						projectsDB.update(project_obj._id, update_obj,function(err,doc){
							if(err) throw err;
						});

		});

		//store the images and the rest of the object in the db
		res.redirect('/projects/'+post.project_slug+'/edit');
 		res.location('/projects/'+post.project_slug+'/edit');

  		//res.render('project', { title: 'Store Projects', slug: 'store-projects' });
	}
};