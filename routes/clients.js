var upload = require('../functions/upload'); //back a folder

/*
 * GET projects
 */

exports.view = function(db){
	return function(req, res){
		var clients = db.get('clients');
		var partners = db.get('partners');
		var projects = db.get('projects');

		clients.find({order:{$gte:0}},function(err,client_docs){
			//console.log(client_docs);
			if(client_docs.length==0) res.render('clients', { title: 'No Clients', slug: 'clients', clients: [], partners: []})
			//iterate through the clients and find projects that are associated
			client_docs.forEach(function(v,i){

				var find_obj = {clients: {$elemMatch: { _id: v._id.toString() } } };

				projects.find(find_obj, 'capabilities title',function(err, project_docs){
					//console.log(i+": "+JSON.stringify(project_docs));
					
					client_docs[i].capabilities = project_docs;
					if(i==client_docs.length-1){

						partners.find({}, function(err,partner_docs){
							//console.log('clients: '+JSON.stringify(client_docs));	//for debug only
							//console.log('partners: '+ JSON.stringify(partner_docs)); //for debug only
							res.render('clients', { title: 'Clients', slug: 'clients', clients: client_docs, partners: partner_docs });

						});

					}//#endif
				});

			})


		});
	}
};

exports.edit = function(db){
	return function(req, res){

		var clients = db.get('clients');
		clients.find({}, function(err,docs){
				//console.log(docs)
		  		res.render('clients_edit', { title: 'Edit Clients',slug: 'edit-clients', clients: docs });

	  	});
	}
}

exports.action = function(db){
	return function(req, res){

		var action = req.params.action;
		var post = req.body;

		console.log(action);
		//console.log(post);

		var clients = db.get('clients');

		if(action === 'update'){

			//console.log(req.files);

			if(req.files.image.name===''){

				console.log('no files');
				var update_obj = { $set: { name: post.name, caption: post.caption, order: parseInt(post.order)}}
				clients.update({_id:post._id},update_obj,function(err,doc){
	
					clients.find({order:{$gte:0}}, function(err,docs){
						//console.log(docs)
						res.render('clients_edit', { title: 'Client Updated',slug: 'edit-clients', clients: docs });

					});

				});
			}else{
				console.log('files');
				upload.clientImage(req.files,function(image){
					//console.log(image);

					post.image = image;
					var update_obj = { $set: { name: post.name, caption: post.caption, image: post.image, order: parseInt(post.order)}}

					clients.update({_id:post._id}, update_obj , function(err,doc){

						//console.log(post);

						clients.find({order:{$gte:0}}, function(err,docs){
							//console.log(docs)
							res.render('clients_edit', { title: 'Client Updated',slug: 'edit-clients', clients: docs });

						});
					});

				});
			}


		}else if(action === 'delete'){

			clients.remove({_id:post._id},function(err,doc){

				clients.find({order:{$gte:0}}, function(err,docs){
					//console.log(docs)
					res.render('clients_edit', { title: 'Client Deleted',slug: 'edit-clients', clients: docs });

				});

			});


		}else if(action === 'submit'){

			var files = req.files;

			upload.clientImage(files,function(image){
				//console.log(image);

				post.image = image;
				post.projects =[];
				post.capabilities = [];
				post.order = parseInt(post.order);

				clients.insert(post, function(err,doc){

					//console.log(post);

					clients.find({order:{$gte:0}}, function(err,docs){
						//console.log(docs)
						res.render('clients_edit', { title: 'Client Added',slug: 'edit-clients', clients: docs });

					});
				});

			});

		}


	}
}


exports.store = function(db){
	return function(req, res){


		var clients = db.get('clients');

		var action = req.params.action;
		var post = req.body;

		//console.log(action);
		//console.log(post);

  		res.render('clients', { title: 'Store Clients', slug: 'store-clients' });
	}
};