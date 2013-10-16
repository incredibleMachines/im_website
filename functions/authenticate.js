exports.admin = function(req, res, next){
	if(!req.session.admin_user && !req.session.key){
		//check that date and key match up
		console.log('page-access-denied');
		console.log(req);
		res.render('admin-login', {title:'You must login to access.', slug:'admin-login', path:req.path});

	}else{
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
			if(err) throw err;
			if(!doc) next(); //must ensure we call next to continue processes
			if(doc.password===null) next();

			//we have a password situation here..
			if(!req.session.project){
				//console.log(req);
				res.render('project-login',{title:'This Project Requires Login', slug: 'project-login', project_slug: name });
				console.log(doc.password);
			}else{
				if(req.session.project === name) next();	
				else res.render('project-login',{title:'This Project Requires Login', slug: 'project-login', project_slug: name });

			}
			
		});

	}

}