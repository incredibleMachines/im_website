
/*
 * GET home page.
 */

exports.index = function(db){
	return function(req, res){
		//db query for all featured projects

		var projects = db.get('projects');

		projects.find({featured: true, order:{$gte: 0}},function(err,docs){
			//console.log(docs);
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
	res.status(404).render('404',{title:'Oops - we don\'t have that page',slug:'page-not-found'})
}

exports.fivehundred = function(req,res){
	res.status(500).render('500',{title:'Internal Service Error', slug:'internal-error' });
}