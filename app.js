
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var user = require('./routes/user');
var projects = require('./routes/projects');
var capabilities = require('./routes/capabilities');
var clients = require('./routes/clients');
var partners = require('./routes/partners');
var technologies = require('./routes/technologies');

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


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//our pages
app.get('/', routes.index);

app.get('/projects', projects.featured(db));
app.get('/projects/edit',projects.edit(db)); //must place this above :name route to ensure it doesn't match :name

app.get('/projects/:name', projects.single(db));
app.get('/projects/:name/:action', projects.action(db));

app.get('/capabilities', capabilities.view(db) );
app.get('/capabilities/edit', capabilities.edit(db) );

app.get('/clients', clients.view(db));
app.get('/clients/edit', clients.edit(db));

app.get('/partners/edit',partners.edit(db));
app.get('/technologies/edit',technologies.edit(db));

app.post('/projects', projects.store(db));

app.post('/projects/:action', projects.store(db));
app.post('/capabilities/:action', capabilities.store(db));
app.post('/clients/:action',clients.action(db));
app.post('/partners/:action',partners.edit(db));
app.post('/technologies/:action',technologies.edit(db));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
