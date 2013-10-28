/*
 *
 *		Project Functionality
 *
 */

var upload = require('../functions/upload'); //back a folder
var fs = require('fs');
var crypto = require('crypto');

/*
 * GET projects
 */

exports.featured = function(db){
	return function(req, res){
		//db query for all featured projects

		var projects = db.get('projects');

		projects.find({featured: true,order:{$gte: 0}},function(err,docs){
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
		projects.find({featured: true,order:{$gte: 0}},'_id slug title',function(err,project_docs){
			

			projects.findOne({slug:name},function(err,doc){

				if(!doc){
					res.render('404', {title: 'Project Not Found', slug:'project-not-found'});
				}else{
					var project_index;
					project_docs.forEach(function(v,i){
						if(v._id.toString() == doc._id.toString()){
							project_index = i;
						}
					});

					var next_project = (project_index == project_docs.length-1) ? 0 : project_index+1;
					var previous_project = (project_index == 0 )? project_docs.length-1 : project_index-1;

					res.render('project', {title: doc.title , slug: 'single-project '+doc.slug, project: doc, next: project_docs[next_project].slug, previous: project_docs[previous_project].slug });
				}
			});

		})

	}
}

/* 
 *
 * GET project/:name/edit
 *	
 */

exports.single_edit = function(db){
	return function(req,res){
		var name = req.params.name;
		console.log('Request for: '+name);

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

						projectsDB.findOne({slug:name},function(err, project_doc){
							
							if(!project_doc){
								res.status(404).render('404', {title: 'Project Not Found', slug:'project-not-found'});
							}else{
								if(project_doc.password != null){
									var decipher = crypto.createDecipher('aes-256-cbc', project_doc.timestamp.toString());
									decipher.update(project_doc.password, 'base64','utf8');
									project_doc.password = decipher.final('utf8');
								}
								data.project = project_doc;
								console.log(data)
								res.render('project_edit', { title: 'Edit '+project_doc.title, slug: 'edit-project	 single-project '+project_doc.slug, data: data});
							}
						})
					});
				});
			});

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
 * GET projects/edit
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

						projectsDB.find({order:{$gte:0}},function(err, project_docs){
							data.projects = project_docs;
							//console.log(data)
							res.render('projects_edit', { title: 'Edit Projects', slug: 'edit-projects', data: data});
						})
					});
				});
			});

		});

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
 		projects.findOne({slug:post.project_slug}, 'password timestamp', function(err,doc){
 			if(err) throw err;
 			//console.log(doc);

 			//create the authentication
 			var cipher = crypto.createCipher('aes-256-cbc', doc.timestamp.toString());
			cipher.update(post.pw, 'utf8','base64');

 			if(doc.password === cipher.final('base64')){

 				req.session.project = post.project_slug;
 				res.redirect('/projects/'+post.project_slug);
 				res.location('/projects/'+post.project_slug);

 			}else{
 				res.render('404',{ title: 'Not Authorized',slug: 'project-not-authorized'});
 			}
 		});
 	}
 }


exports.update_order = function(db){

	return function(req,res){
		var post = req.body; //this is our form data
		console.log(post)
		var projects = db.get('projects');

		var update_obj = {$set: {order: parseInt(post.order)}};
		projects.update({_id: post._id},update_obj,function(err){

				res.redirect('/projects/edit');
	 			res.location('/projects/edit');
		})
	}
}

/* 
 *
 * POST project/:name/update
 *	
 */

 exports.single_update = function(db){
 	return function(req,res){
 		console.log("+++++++++++POST+++++++++++++");
		var post = req.body; //this is our form data
		//console.log(JSON.stringify(post)); //fixed arrays by adding indexs to items
		console.log(post)
		console.log("+++++++++++FILES+++++++++++++");
		var files = req.files; //the incoming files from the server
		//console.log(JSON.stringify(files)); //fixed arrays by adding indexs to items
		//console.log(files);

		//get our project collection
		var projectsDB = db.get('projects');
		var clientsDB = db.get('clients'); 
		var partnersDB = db.get('partners');
		var capabilitiesDB = db.get('capabilities');
		var techologiesDB = db.get('technologies');
		//update base
		var model = {	title: post.project_title, 
						slug: post.project_slug,
						order: parseInt(post.project_order),
						video_url: post.project_video,
						video_backup: post.project_video_backup,
						featured: (post.project_featured === 'true')? true : false,
						textBlocks: post.project_text,
						infoBlocks: post.project_info,
						imageType: post.project_image_type,
						clients: [],
						partners: [],
						technologies:[],
						capabilities:[]
						}
		var obj = {$set: model};

		//update object
		projectsDB.update({_id:post.project_id},obj,function(err){
				projectsDB.findOne({slug: post.project_slug},function(err,doc){
					console.log('------------------------FOUND OBJECT---------------------------');
					console.log(doc);
					if(post.clients){

						post.clients.forEach(function(v,i){

							clientsDB.findOne({_id:v},function(err,client_obj){

								if(err) throw err;
								var update_obj = {$addToSet: {clients: {_id: client_obj._id.toString(), name: client_obj.name } }};
								projectsDB.update({_id: post.project_id}, update_obj,function(err,doc){
									if(err) throw err;
								});


							});

							var update_obj = {$addToSet: {projects: {_id:post.project_id, slug: post.project_slug, title: post.project_title }}}
							clientsDB.update({_id:v},update_obj,function(err){
								if(err) throw err;
							});
						});

					}//end if post.clients
					//update each capability with project and vice versa
					if(post.capabilities){
						//console.log('capabilities');
						post.capabilities.forEach(function(v,i){
							console.log('capabilities: '+v);

							capabilitiesDB.findOne({_id:v},function(err,capability_obj){
								if(err)throw err;
								var update_obj = {$addToSet:{capabilities: {_id:capability_obj._id.toString(), name: capability_obj.name, text: capability_obj.text } } };
								projectsDB.update({_id: post.project_id },update_obj,function(err,doc){
									if(err) throw err;
								});
							});
							var update_obj = {$addToSet: {projects: {_id:post.project_id, slug: post.project_slug, title: post.project_title }}};
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
								var update_obj = {$addToSet:{technologies: {_id:technology_obj._id.toString(), name: technology_obj.name } }};
								projectsDB.update({_id: post.project_id },update_obj,function(err,doc){
									if(err) throw err;
								});
							});
							var update_obj = {$addToSet: {projects: {_id:post.project_id, slug: post.project_slug, title: post.project_title }}};
							techologiesDB.update({_id:v},update_obj,function(err){
								if(err) throw err;
							});


						});

					}//endif post.technology
					//update each partner with project and vice versa
					if(post.partners){

						post.partners.forEach(function(v,i){

							partnersDB.findOne({_id:v},function(err,partner_obj){
								if(err)throw err;
								var update_obj = {$addToSet: {partners: {_id:partner_obj._id.toString(), name: partner_obj.name  } } };
								projectsDB.update({_id: post.project_id },update_obj,function(err,doc){
									if(err) throw err;
								});
							});

							var update_obj = {$addToSet: {projects: {_id:post.project_id, slug: post.project_slug, title: post.project_title }}};
							partnersDB.update({_id:v},update_obj,function(err){
								if(err) throw err;
							});

						});

					}
					//check project password
					if(post.project_password && post.project_password != '' ){
						// console.log('Password');
						
						var cipher = crypto.createCipher('aes-256-cbc', doc.timestamp.toString());
						cipher.update(post.project_password, 'utf-8','base64');
						var update_obj = {$set: {password: cipher.final('base64'),featured: false}} 
						
						projectsDB.update({_id:post.project_id},update_obj,function(err,doc){
							if(err) throw err;
						})

					}else{

						var update_obj = {$set: {password: null, featured: (post.project_featured === 'true')? true : false }}
						projectsDB.update({_id:post.project_id},update_obj,function(err,doc){
							if(err) throw err;
						})
					}

					//check for thumbnail image update
					if(files.project_thumbnail.size !=0 ){
						//upload new image and update thumbnail
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

							projectsDB.update({_id:post.project_id},update_obj,function(err,doc){
								if(err) throw err;
							});

						});

					}else{console.log('No Thumbnail Images')}

					//check for poster image update
					if(files.project_poster_image.size !=0){
						//upload poster image and update poster
						var poster = files.project_poster_image;
						delete files.project_poster_image;

						var path = "./public/uploads/posters/"+poster.originalFilename;
						fs.rename("./"+poster.path, path, function(err){
							if(err) throw err;
							console.log(' moved : %s to %s',thumbnail.path, path);
							poster.path = path.substring(8);
							poster.type = poster.headers['content-type'];
							poster.name = poster.originalFilename;

							delete poster.originalFilename;
							delete poster.headers;
							delete poster.ws;

							var update_obj = {$set:{poster:poster}};
							projectsDB.update({_id: post.project_id},update_obj,function(err,doc){
								if(err) throw err;
							})
						});
					}else{console.log('No Poster Images')}

					//check if there are any image block updates?
					//figure out what the hell to do with them.
					if(files.project_image_block){
						var size=0;
						console.log('Checking Image Blocks');
						files.project_image_block.forEach(function(block,i){
							block.forEach(function(image, j){
								//if(block.size == 0) 
								console.log("i: "+i+" j: "+j+" size: "+image.size)
								size+=image.size;
							});
							if(i == files.project_image_block.length-1 && size == 0){
								console.log('No Images');
							}else if(i == files.project_image_block.length-1 && size > 0){
								console.log('Images!');
								//set image block to []
								//upload and update images
								upload.projectImages(files, function(images){
								//console.log(images);
											var update_obj = {$set: {imageBlocks: images}};
											projectsDB.update({_id:post.project_id}, update_obj,function(err,doc){
												if(err) throw err;
											});

								});
							}
						});
					}

				res.redirect('/projects/'+post.project_slug+'/edit');
	 			res.location('/projects/'+post.project_slug+'/edit');
 			});
		});
		//TO DO:

 	}
 }

/*
 * POST project/
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
						order: parseInt(post.project_order),
						location: post.project_location,
						video_url: post.project_video,
						video_backup: post.project_video_backup,
						thumbnail: null,
						poster: null,
						imageBlocks: [],
						imageType: post.project_image_type,
						textBlocks: (post.project_text)? post.project_text : {},
						infoBlocks: (post.project_info)? post.project_info : {},
						featured: (post.project_featured === 'true') ? true : false,
						password: null,
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

		if(files.project_poster_image){
			var poster = files.project_poster_image;
			delete files.project_poster_image;

			var path = "./public/uploads/posters/"+poster.originalFilename;
			fs.rename("./"+poster.path, path, function(err){
				if(err) throw err;
				console.log(' moved : %s to %s',thumbnail.path, path);
				poster.path = path.substring(8);
				poster.type = poster.headers['content-type'];
				poster.name = poster.originalFilename;

				delete poster.originalFilename;
				delete poster.headers;
				delete poster.ws;

				var update_obj = {$set:{poster:poster}};
				projectsDB.update(project_obj._id,update_obj,function(err,doc){
					if(err) throw err;
				})
			});

		}
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
				var caption =post.new_client_caption[i];
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

			 		var client_obj = {name: client, caption: caption, image: image, projects: [{_id:project_obj._id.toString(), slug: project_obj.slug, title: project_obj.title }], capabilities:[] };

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
		if(post.project_password){
			//encrypt password
			var cipher = crypto.createCipher('aes-256-cbc', project_obj.timestamp.toString());
			cipher.update(post.project_password, 'utf-8','base64');
			var update_obj = {$set: {password: cipher.final('base64')}} 
			projectsDB.update(project_obj._id,update_obj,function(err,doc){
				if(err) throw err;
			})
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