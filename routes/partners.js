exports.edit = function(db){

	return function(req, res){
		var partners = db.get('partners');

		partners.find({},function(err,docs){
			res.render('partners_edit', { title: 'Edit Partners', slug: 'edit-partners', partners: docs });
		});
		
	}

};

exports.action = function(db){
	return function(req,res){
		var partners = db.get('partners');

		var action = req.params.action;
		var post = req.body;

		console.log(action);
		console.log(post);

		if(action === 'submit'){
			post.projects = [];
			partners.insert(post, function(err,doc){
				partners.find({},function(err,docs){
					res.render('partners_edit',{title: 'Partner Submitted', slug:'edit-partners',partners:docs});
				});
			});
		}else if(action==='update'){

			var update_obj = {$set: {name: post.name}};
			partners.update({_id: post._id},update_obj,function(err,doc){
				partners.find({},function(err,docs){
					res.render('partners_edit',{title: 'Partner Updated', slug:'edit-partners',partners:docs});
				});

			})
		}else if(action==='delete'){

			partners.remove({_id: post._id},function(err,doc){
				partners.find({},function(err,docs){
					res.render('partners_edit',{title: 'Partner Deleted', slug:'edit-partners',partners:docs});
				});

			});

		}
	}
}