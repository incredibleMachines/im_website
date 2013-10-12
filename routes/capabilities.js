/*
 * GET projects
 */

exports.view = function(db){
	return function(req, res){
  		res.render('capabilities', { title: 'Capabilities', slug: 'capabilities' });
	}
};

exports.edit = function(db){
	return function(req, res){

		var capabilities = db.get('capabilities');
		capabilities.find({}, function(err,docs){
			console.log(docs)
  			res.render('capabilities_edit', { title: 'Edit Capabilities', slug: 'edit-capabilities', capabilities: docs });
  		});
	}
};

exports.store = function(db){
	return function(req, res){

		var capabilities = db.get('capabilities');

		var action = req.params.action;
		var post = req.body;

		console.log(action);
		console.log(post);
		
		if(action == 'update'){
			capabilities.update({_id:post._id},post, function(err, doc){
				if(err) throw err;
				console.log(doc);
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