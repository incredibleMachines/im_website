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
  		res.render('capabilities', { title: 'Edit Capabilities', slug: 'edit-capabilities' });
	}
};

exports.store = function(db){
	return function(req, res){
  		res.render('capabilities', { title: 'Store Capabilities', slug: 'store-capabilities' });
	}
};