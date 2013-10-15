exports.edit = function(db){

	return function(req, res){
		var technologies = db.get('technologies');

		technologies.find({},function(err,docs){
			res.render('technologies_edit', { title: 'Edit Technologies', slug: 'edit-technologies', technologies: docs });
		});
	}

};


exports.action = function(db){

	return function(req,res){
		var technologies = db.get('technologies');

		var action = req.params.action;
		var post = req.body;

		console.log(action);
		console.log(post);

		if(action === 'submit'){
			post.projects = [];
			technologies.insert(post, function(err,doc){

					//console.log(post);

					technologies.find({}, function(err,docs){
						//console.log(docs)
						res.render('technologies_edit', { title: 'Technology Added', slug: 'edit-technologies', technologies: docs });

					});
				});

		}else if(action ==='update'){

			var update_obj = {$set: { name: post.name}};

			technologies.update({_id: post._id}, update_obj, function(err,doc){
				technologies.find({},function(err,docs){
					res.render('technologies_edit', {title: 'Technology Updated', slug: 'edit-technologies', technologies:docs});
				});
			});

		}else if(action ==='delete'){

			technologies.remove({_id:post._id},function(err,doc){

				technologies.find({}, function(err,docs){
					//console.log(docs)
					res.render('technologies_edit', { title: 'Technology Deleted',slug: 'edit-technologies', technologies: docs });

				});

			});


		}


	}

}