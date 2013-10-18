
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes')
var admin = require('./routes/admin');

var user = require('./routes/user');
var projects = require('./routes/projects');
var capabilities = require('./routes/capabilities');

var clients = require('./routes/clients');
var partners = require('./routes/partners');
var technologies = require('./routes/technologies');
var authenticate = require('./functions/authenticate');

var http = require('http');
var path = require('path');

//setup mongo db
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/im_site');

//less 
var less= require('less-middleware');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon( path.join(__dirname, 'public/favicon/fav.ico') )); //change for favicon
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir: './tmp', keepExtensions: true})); //temporary folder to store images
app.use(express.methodOverride());
app.use(express.cookieParser('th3m4ch1n3s'));//cookies!
app.use(express.session());//sessions!
app.use(app.router);
app.use( less( {src: __dirname+ '/public', force: true } ) );
app.use(express.static(path.join(__dirname, 'public')));


//development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//our pages
//get routes
app.get('/', routes.index);
app.get('/projects', projects.featured(db)); //get all featured projects

//authenticated project pages
app.get('/projects/edit', authenticate.admin, projects.edit(db)); //must place this above :name route to ensure it doesn't match :name
app.get('/projects/:name',authenticate.project(db), projects.single(db)); //will need custom authentication
app.get('/projects/:name/:action', authenticate.admin, projects.action(db));

app.get('/capabilities', capabilities.view(db) );
app.get('/clients', clients.view(db));
app.get('/admin/login', admin.login); //admin login view
app.get('/admin/create',admin._new(db));


//authenticated other pages pages
app.get('/capabilities/edit', authenticate.admin, capabilities.edit(db) );
app.get('/clients/edit',authenticate.admin, clients.edit(db));
app.get('/partners/edit',authenticate.admin, partners.edit(db));
app.get('/technologies/edit',authenticate.admin, technologies.edit(db));
app.get('/admin/index',authenticate.admin,admin.index); //index??

//post routes
app.post('/projects', projects.store(db));
app.post('/projects/login', projects.login(db));
app.post('/projects/:action', projects.store(db));
app.post('/capabilities/:action', capabilities.action(db));
app.post('/clients/:action',clients.action(db));
app.post('/partners/:action',partners.action(db));
app.post('/technologies/:action',technologies.action(db));

app.post('/login', admin.auth(db));
app.post('/create',admin.create(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
