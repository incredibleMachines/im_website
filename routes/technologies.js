exports.edit = function(db){

	return function(req, res){
		res.render('technologies_edit', { title: 'Edit Technologies', slug: 'edit-technolgies' });
	}

};