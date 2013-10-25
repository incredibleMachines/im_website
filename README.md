Getting Started
===============

OSX Install
-----------

Make sure you have mongodb installed 
			
	$ which mongodb
		
	-if not install using homebrew
		
		$ brew install mongodb

	-if installed ensure mongod is default
		
		$ brew info mongodb

			- follow instructions
	
Make sure mongod is running

	$ mongod 
		
	or 

	$ brew info mongodb	
	
 Enter server root folder

	$ cd /path/to/your/folder

	$ npm install
	
	$ mkdir tmp
	
	$ mkdir public/uploads	

	$ mkdir public/uploads/clients	
	
	$ mkdir public/uploads/posters	
	
	$ mkdir public/uploads/thumbnails	

	$ mkdir public/videos

Ensure DB indexes
	
	$ mongo 

	$ use im_site

	$ db.projects.ensureIndex({order:1})

	$ db.capabilities.ensureIndex({order:1})

	$ db.clients.ensureIndex({order:1})	
	
	$ db.projects.ensureIndex({timestamp: -1})	

Run the app on localhost	

	$ node app.js
	
Setup admin un/pw
	
	Visit /admin/create - only once
	
	
Linux install
---------------

Almost the same as above. use apt-get in place of brew follow OSX instructions above except running app and nvm

Set node application with nvm

	$ nvm use 0.10.21

Start app with nvm & forever.js

	$ cd /var/www
	
	$ forever start -l im_site.log -a -o im_site_out.log -e im_site_errors.log app.js 

Check out Forevers Console logs

	$ tail -f ~/.forever/im_site.log

Restart Forever and Code
	
	$ cd /var/www

	$ git pull origin master

	$ forever restartall

Check if the app is running

	$ forever list


*If you type Node and receive:

	The program 'node' can be found in the following packages:
 		* node
 		* nodejs-legacy
	Ask your administrator to install one of them

*Or if you type Forever and receive:

	forever: command not found

*YOU MUST INIT NVM FIRST

	nvm use 0.10.21






Notes:
---------------

	Beta Beta


