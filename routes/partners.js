exports.edit = function(db){

	return function(req, res){
		res.render('partners_edit', { title: 'Edit Partners', slug: 'edit-partners' });
	}

};