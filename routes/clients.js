var upload = require('../functions/upload'); //back a folder

/*
 * GET projects
 */

exports.view = function(db){
	return function(req, res){
		var clients = db.get('clients');
		clients.find({},function(err,docs){
			console.log(docs);
			 res.render('clients', { title: 'Clients', slug: 'clients', clients: docs });

		});
	}
};

exports.edit = function(db){
	return function(req, res){

		var clients = db.get('clients');
		clients.find({}, function(err,docs){
				console.log(docs)
		  		res.render('clients_edit', { title: 'Edit Clients',slug: 'edit-clients', clients: docs });

	  	});
	}
}

exports.action = function(db){
	return function(req, res){

		var action = req.params.action;
		var post = req.body;

		console.log(action);
		console.log(post);

		var clients = db.get('clients');

		if(action === 'update'){

			//console.log(req.files);

			if(req.files.image.name===''){

				console.log('no files');
				var update_obj = { $set: { name: post.name, caption: post.caption}}
				clients.update({_id:post._id},update_obj,function(err,doc){
	
					clients.find({}, function(err,docs){
						//console.log(docs)
						res.render('clients_edit', { title: 'Client Updated',slug: 'edit-clients', clients: docs });

					});

				});
			}else{
				console.log('files');
				upload.clientImage(req.files,function(image){
					console.log(image);

					post.image = image;
					var update_obj = { $set: { name: post.name, caption: post.caption, image: post.image}}

					clients.update({_id:post._id}, update_obj , function(err,doc){

						//console.log(post);

						clients.find({}, function(err,docs){
							//console.log(docs)
							res.render('clients_edit', { title: 'Client Updated',slug: 'edit-clients', clients: docs });

						});
					});

				});
			}


		}else if(action === 'delete'){

			clients.remove({_id:post._id},function(err,doc){

				clients.find({}, function(err,docs){
					//console.log(docs)
					res.render('clients_edit', { title: 'Client Deleted',slug: 'edit-clients', clients: docs });

				});

			});


		}else if(action === 'submit'){

			var files = req.files;

			upload.clientImage(files,function(image){
				console.log(image);

				post.image = image;
				post.projects =[];
				post.capabilities = [];

				clients.insert(post, function(err,doc){

					//console.log(post);

					clients.find({}, function(err,docs){
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

		console.log(action);
		console.log(post);

  		res.render('clients', { title: 'Store Clients', slug: 'store-clients' });
	}
};