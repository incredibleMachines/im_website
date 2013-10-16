/*
* Admin Login functionality
*/

exports.index = function(req,res){
	res.render('admin-index',{title:'Welcome Back.', slug:'admin-index'});

}
exports.login = function(req,res){

	res.render('admin-login', {title:'Please Login', slug:'admin-login'});

}

exports.auth = function(db){
		return function(req,res){

			var post = req.body;
			console.log(post);
			//make db check in collection for admins/users
			//var internal = db.get('internal');
			if(post.user == "admin" && post.pw == "user"){
				req.session.admin_user = new Date();//get date
				req.session.key = '1231231'; //generate number
				//res.render('admin-index',{title:'Welcome Back.', slug:'admin-index'});
				res.redirect(post.path);
				res.location(post.path);
			}
		}
} 