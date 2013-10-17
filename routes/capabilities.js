/*
 * GET projects
 */

exports.view = function(db){
	return function(req, res){

		//load our collections
		var capabilities = db.get('capabilities');
		var projects = db.get('projects');
		var clients = db.get('clients');

		capabilities.find({}, function(err,docs){

			//iterate through each capability and find out which projects are linked
			console.log(docs.length)
			docs.forEach(function(v,i){

				//find associated projects where capabilities id is in project capability array
				var find_obj = {capabilities: {$elemMatch: { _id: v._id.toString() } } };
				projects.find(find_obj,'thumbnail title clients', function(err, project_docs){
					//console.log(i+": "+JSON.stringify(project_docs));

					docs[i].projects = project_docs;

					if(i == docs.length-1){
						console.log(JSON.stringify(docs));
						res.render('capabilities', { title: 'Capabilities', slug: 'capabilities', capabilities:docs });

					}
				});


			});

  		});
	}
};

exports.edit = function(db){
	return function(req, res){

		var capabilities = db.get('capabilities');
		capabilities.find({}, function(err,docs){
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
		console.log(post);
		
		if(action == 'update'){
			var update_obj = {$set: {name: post.name, text: post.text}};
			capabilities.update({_id:post._id},update_obj, function(err, doc){
				if(err) throw err;
				//console.log(doc);
				capabilities.find({}, function(err,docs){
					//console.log(docs)
		  			res.render('capabilities_edit', { title: 'Capabilities Updated', slug: 'edit-capabilities', capabilities: docs });
		  		});


			})


		}else if(action == 'delete'){


			capabilities.remove({_id:post._id},function(err,doc){
				if(err) throw err;
				//console.log('removed');
				capabilities.find({}, function(err,docs){
					//console.log(docs)
		  			res.render('capabilities_edit', { title: 'Capability Deleted', slug: 'edit-capabilities', capabilities: docs });
		  		});

			});

		}else if(action == 'submit'){
			post.slug = post.name.toLowerCase().replace(/ /g,'-');
			post.projects = [];
			post.clients = [];
			capabilities.insert(post, function(err,doc){

				if(err) throw err;

				capabilities.find({}, function(err,docs){
					//console.log(docs)
		  			res.render('capabilities_edit', { title: 'Capability Added', slug: 'edit-capabilities', capabilities: docs });
		  		});
			});

		}

	}
};