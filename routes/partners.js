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
		
	}
}