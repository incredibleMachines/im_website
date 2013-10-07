/*
 * GET projects
 */

exports.view = function(db){
	return function(req, res){
  		res.render('clients', { title: 'Clients', slug: 'clients' });
	}
};

exports.edit = function(db){
	return function(req, res){
  		res.render('clients', { title: 'Edit Clients',slug: 'edit-clients' });
	}
};

exports.store = function(db){
	return function(req, res){
  		res.render('clients', { title: 'Store Clients', slug: 'store-clients' });
	}
};