/*
* Admin Login functionality
*/

var crypto = require('crypto');

//is this a page? do we need it?
exports.index = function(req,res){
	res.render('admin-index',{title:'Welcome Back.', slug:'admin-index'});

}
exports.login = function(req,res){

	res.render('admin-login', {title:'Please Login', slug:'admin-login', post_path: '/login' });

}
exports._new = function(db){
	return function(req,res){
		var users = db.get('internal');
		users.find({},function(err,docs){
			if(docs.length > 0){
				res.render('admin-login', {title:'Please Login', slug:'admin-login', post_path: '/login' });

			}else{
				res.render('admin-login', {title: 'Create User and Login', slug: 'admin-create', post_path: '/create' });
			}
		});
	
	}
}

exports.auth = function(db){
		return function(req,res){
			var users = db.get('internal');

			var post = req.body;
			console.log(post);
			//make db check in collection for admins/users
			//var internal = db.get('internal');
			var path = (post.path)? post.path : '/admin/index';
			users.findOne({user:post.user},function(err,doc){
				if(!doc){ 

					console.log('No User By that Name');
					res.render('admin-login',{title:'No Users By That Name', slug:'admin-login', path:path});

				}

				//check hash

				var cipher = crypto.createCipher('aes-256-cbc', doc.key.toString());
				cipher.update(post.pw, 'utf-8','base64');

				var encrypted = cipher.final('base64');
				if(encrypted == doc.sum){
					console.log('Authenitcated');
					//store values in session
					req.session.admin_user = post.user;
					req.session.key = new Date();
					res.redirect(path);
					res.location(path);

				}else{
					console.log('Not Authorized');
					//log users ip to block them out
					res.render('admin-login',{title:'Incorrect Password', slug:'admin-login', path:path});
				}
				




			});
			// if(post.user == "admin" && post.pw == "user"){
			// 	req.session.admin_user = new Date();//get date
			// 	req.session.key = '1231231'; //generate number
			// 	//res.render('admin-index',{title:'Welcome Back.', slug:'admin-index'});
			// 	res.redirect(post.path);
			// 	res.location(post.path);
			// }
		}
} 

exports.create = function(db){
	return function (req,res){

		var post = req.body;
		var users = db.get('internal');

		users.find({},function(err,docs){
			if(docs.length > 0){
			 res.render('admin-login', {title:'Please Login', slug:'admin-login', post_path: '/login'});
			}else{

				var obj = {key: new Date(), user: post.user, sum: null};

				users.insert(obj,function(err){
					console.log('creating admin');
					console.log(obj);
					//create hash
					var cipher = crypto.createCipher('aes-256-cbc', obj.key.toString());
					cipher.update(post.pw, 'utf-8','base64');
					var update_obj = {$set: {sum: cipher.final('base64')}} 

					users.update(obj._id,update_obj,function(err,docs){
						res.render('admin-login', {title:'Please Login', slug:'admin-login', post_path: '/login', path: '/admin/index'});
					});


				});
				
			}
		});


	}
}