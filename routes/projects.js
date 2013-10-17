var upload = require('../functions/upload'); //back a folder
var fs = require('fs');

/*
 *
 *
 */


/*
 * GET projects
 */

exports.featured = function(db){
	return function(req, res){
		//db query for all featured projects

		var projects = db.get('projects');

		projects.find({featured: true},function(err,docs){
			console.log(docs);
			res.render('projects', { title: 'Featured Projects' , slug: 'projects', projects: docs});

		});
		//array push each project 
	}
};

/*
 * GET project/:name
 */

exports.single = function(db) {
	return function(req,res) {
		var name = req.params.name;
		//query the database and load all the info
		var projects = db.get('projects');

		projects.findOne({slug:name},function(err,doc){

			console.log(doc);
			if(!doc){
				res.render('404', {title: 'Project Not Found', slug:'project-not-found'});
			}else{
				res.render('project', {title: doc.title , slug: 'single-project '+doc.slug, project: doc });
			}
		});

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

		projects.findOne({ slug: name}, function(err,doc){
			console.log(doc);
			res.render('project_'+action, {title: 'Project Action', slug: 'project-'+action, project: doc});

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
		var techologiesDB = db.get('technologies');
		var projectsDB = db.get('projects');

		//find all the data we need - async and then render the page when its all ready.
		clientsDB.find({},function(err,clients_docs){

			data.clients = clients_docs;
			partnersDB.find({},function(err,partners_docs){
				data.partners = partners_docs;
				capabilitiesDB.find({},function(err,capabilities_docs){
					data.capabilities = capabilities_docs;
					techologiesDB.find({},function(err,technology_docs){
						data.technology = technology_docs;

						projectsDB.find({},function(err, project_docs){
							data.projects = project_docs;
							res.render('projects_edit', { title: 'Edit Projects', slug: 'edit-projects', data: data});
						})
					});
				});
			});

		})

	}
};


/*
 *
 * POST projects/login
 *
 */

 exports.login = function(db){
 	return function(req,res){
 		
 		var projects = db.get('projects');

 		var post = req.body;
 		console.log(post)
 		projects.findOne({slug:post.project_slug}, 'password', function(err,doc){
 			if(err) throw err;
 			//console.log(doc);
 			if(doc.password === post.pw){

 				req.session.project = post.project_slug;
 				res.redirect('/projects/'+post.project_slug);
 				res.location('/projects/'+post.project_slug);

 			}else{
 				res.render('404',{ title: 'Not Authorized',slug: 'project-not-authorized'});
 			}
 		});
 	}
 }


/*
 * POST project/:name/:action
 */

 /*
  * Notes: In need of major clean-up most stuff should go to upload
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
		var techologiesDB = db.get('technologies');


		var storedClients = []; //holding the data to our operations



		var project_obj = {
						title: post.project_title,
						slug: post.project_slug,
						video_url: post.project_video,
						video_backup: post.project_video_backup,
						thumbnail: null,
						imageBlocks: [],
						textBlocks: (post.project_text)? post.project_text : {},
						infoBlocks: (post.project_info)? post.project_info : {},
						featured: (post.project_featured === 'true') ? true : false,
						password: (post.project_password) ? post.project_password : null,
						capabilities: [],
						clients: [],
						technologies: [],
						partners: [],
						timestamp: new Date()
				};

		projectsDB.insert(project_obj, function(err,doc){

			if(err) throw err;
			console.log(project_obj); //doc id automatically inserted into the obj
			//create process function which adds all the information into our project 
			//console.log(project_obj._id);
			console.log(project_obj._id.toString());
		});


		if(files.project_thumbnail){

			var thumbnail = files.project_thumbnail;
			delete files.project_thumbnail;

			var path = "./public/uploads/thumbnails/"+thumbnail.originalFilename;

			fs.rename("./"+thumbnail.path, path, function(err){
				if(err) throw err;
				console.log(' moved : %s to %s',thumbnail.path, path);
				thumbnail.path = path.substring(8);
				thumbnail.type = thumbnail.headers['content-type'];
				thumbnail.name = thumbnail.originalFilename;

				delete thumbnail.originalFilename;
				delete thumbnail.headers;
				delete thumbnail.ws;

				var update_obj = {$set: {thumbnail: thumbnail}};

				projectsDB.update(project_obj._id,update_obj,function(err,doc){
					if(err) throw err;
				});

			});

		}
		//process new clients
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
					image.path = path.substring(8);;	//reset our path to root of server
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

		//process new partners
		if(post.new_partner_name){
			

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
		//process new capabilities
		if(post.new_capabilities){

			post.new_capabilities.forEach(function(v,i){
				var capability_obj = v;
				capability_obj.slug = v.name.toLowerCase().replace(/ /g,'-');
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
		//process new technologies
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
		//update each capability with project and vice versa
		if(post.capabilities){
			//console.log('capabilities');
			post.capabilities.forEach(function(v,i){
				console.log('capabilities: '+v);

				capabilitiesDB.findOne({_id:v},function(err,capability_obj){
					if(err)throw err;
					var update_obj = {$push:{capabilities: {_id:capability_obj._id.toString(), name: capability_obj.name, text: capability_obj.text } } };
					projectsDB.update(project_obj._id,update_obj,function(err,doc){
						if(err) throw err;
					});
				});
				var update_obj = {$push: {projects: {_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }}};
				capabilitiesDB.update({_id:v},update_obj,function(err){
					if(err) throw err;
				});

			});
		}
		//update each technology with project and vice versa
		if(post.technology){
			console.log(post.technology);
			post.technology.forEach(function(v,i){

				techologiesDB.findOne({_id:v},function(err,technology_obj){
					if(err)throw err;
					var update_obj = {$push:{technologies: {_id:technology_obj._id.toString(), name: technology_obj.name } }};
					projectsDB.update(project_obj._id,update_obj,function(err,doc){
						if(err) throw err;
					});
				});
				var update_obj = {$push: {projects: {_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }}};
				techologiesDB.update({_id:v},update_obj,function(err){
					if(err) throw err;
				});


			});

		}
		//update each partner with project and vice versa
		if(post.partners){

			post.partners.forEach(function(v,i){

				partnersDB.findOne({_id:v},function(err,partner_obj){
					if(err)throw err;
					var update_obj = {$push: {partners: {_id:partner_obj._id.toString(), name: partner_obj.name  } } };
					projectsDB.update(project_obj._id,update_obj,function(err,doc){
						if(err) throw err;
					});
				});

				var update_obj = {$push: {projects: {_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }}};
				partnersDB.update({_id:v},update_obj,function(err){
					if(err) throw err;
				});

			});

		}
		//update each client with project and vice versa
		if(post.clients){

			post.clients.forEach(function(v,i){

				clientsDB.findOne({_id:v},function(err,client_obj){

					if(err) throw err;
					var update_obj = {$push: {clients: {_id: client_obj._id.toString(), name: client_obj.name } }};
						projectsDB.update(project_obj._id, update_obj,function(err,doc){
							if(err) throw err;
					});


				});

				var update_obj = {$push: {projects: {_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }}}
				clientsDB.update({_id:v},update_obj,function(err){
					if(err) throw err;
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