/*
 * GET capabilities
 */

exports.view = function(db){
	return function(req, res){

		//load our collections
		var capabilities = db.get('capabilities');
		var projects = db.get('projects');
		var clients = db.get('clients');
		res.setHeader('location','/capabilities#produce-text');


		capabilities.find({order:{$gte:0}}, function(err,docs){

			//iterate through each capability and find out which projects are linked
			//console.log(docs.length)
			if(docs.length==0) res.render('capabilities', { title: 'No Capabilities', slug: 'capabilities', capabilities:docs });
			var confirmed = 0;
			docs.forEach(function(v,i){

				//find associated projects where capabilities id is in project capability array
				var find_obj = {capabilities: {$elemMatch: { _id: v._id.toString() } }, featured: true };
				projects.find(find_obj,'thumbnail title slug clients', function(err, project_docs){
					//console.log(i+": "+JSON.stringify(project_docs));

					docs[i].projects = project_docs;
					confirmed++;
					if(confirmed == docs.length){
						//console.log(JSON.stringify(docs));
						
						var session = false;
						if(req.session.capabilities){
							console.log('session');
							session = true;
						}else{
							req.session.capabilities = new Date();
						}

						res.render('capabilities', { title: 'Capabilities', slug: 'capabilities', capabilities:docs, session: session });

					}
				});


			});

  		});
	}
};

exports.edit = function(db){
	return function(req, res){

		var capabilities = db.get('capabilities');
		capabilities.find({order: {$gte:0}}, function(err,docs){
			//console.log(docs)
  			res.render('capabilities_edit', { title: 'Edit Capabilities', slug: 'edit-capabilities', capabilities: docs });
  		});
	}
};

exports.action = function(db){
	return function(req, res){

		var capabilities = db.get('capabilities');

		var action = req.params.action;
		var post = req.body;

		console.log(action);
		//console.log(post);
		
		if(action == 'update'){
			var update_obj = {$set: {name: post.name, text: post.text, order: parseInt(post.order)}};
			capabilities.update({_id:post._id},update_obj, function(err, doc){
				if(err) console.error(err);
				//console.log(doc);
				capabilities.find({order: {$gte:0}}, function(err,docs){
					//console.log(docs)

		  			res.render('capabilities_edit', { title: 'Capabilities Updated', slug: 'edit-capabilities', capabilities: docs });
		  		});


			})


		}else if(action == 'delete'){


			capabilities.remove({_id:post._id},function(err,doc){
				if(err) console.error(err);
				//console.log('removed');
				capabilities.find({order: {$gte:0}}, function(err,docs){
					//console.log(docs)
		  			res.render('capabilities_edit', { title: 'Capability Deleted', slug: 'edit-capabilities', capabilities: docs });
		  		});

			});

		}else if(action == 'submit'){
			post.slug = post.name.toLowerCase().replace(/ /g,'-');
			post.projects = [];
			post.clients = [];
			post.order = parseInt(post.order);
			capabilities.insert(post, function(err,doc){

				if(err) console.error(err);

				capabilities.find({order: {$gte:0}}, function(err,docs){
					//console.log(docs)
		  			res.render('capabilities_edit', { title: 'Capability Added', slug: 'edit-capabilities', capabilities: docs });
		  		});
			});

		}

	}
};