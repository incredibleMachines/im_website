
/*
 * GET home page.
 */

exports.index = function(db){
	return function(req, res){
		//db query for all featured projects

		var projects = db.get('projects');

		projects.find({featured: true},function(err,docs){
			console.log(docs);
			res.render('index', { title: 'Incredible Machines' , slug: 'projects', projects: docs});

		});
		//array push each project 
	}
};
/*
 *	GET reel page
 */

exports.reel = function(req,res){
	res.render('reel', {title: 'The Reel', slug: 'reel'});
}
/* 
 *  GET 404 page
 */
exports.forohfor = function(req,res){
	res.render('404',{title:'Page Not Found',slug:'404'})
}