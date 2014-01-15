
exports.admin = function(req, res, next){
	if(!req.session.admin_user && !req.session.key){
		//check that date and key match up
		console.log('page-access-denied');
		//console.log(req);
		console.log(req.path);
		res.render('admin-login', {title:'You must login to access.', slug:'admin-login', post_path: '/login', path:req.path});

	}else{

		//check the value matches for username

		console.log(req.session.admin_user);
		next();
	}
}

//check the project db to see if the project requires a password
exports.project = function(db){

	return function(req,res,next){
		var name = req.params.name;
		//query the database and load all the info
		var projects = db.get('projects');
		console.log("AUTHENTICATE PROJECTS");

		projects.findOne({slug:name}, 'password',function(err,doc){
			if(err) console.error(err);
			console.log(doc)
			if(doc === null ){ 
				console.log('doc==null')
				next();  //must ensure we call next to continue processes
			}else if(doc.password===null || doc.password == null){ next(); //no password
			
			}else{

				//we have a password situation here..

				if(!req.session.project){
					//console.log(req);
					res.render('project_login',{title:'This Project Requires Login', slug: 'project-login', project_slug: name });
					console.log(doc.password);
				}else{
					if(req.session.project === name) next();	
					else res.render('project_login',{title:'This Project Requires Login', slug: 'project-login', project_slug: name });

				}
			}
			
		});

	}

}