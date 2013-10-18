Getting Started:
---------------

Make sure you have mongodb installed 
		
	On OSX	
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

Ensure DB indexes
	
	$ mongo
	
	$ use im_site	
	
	$ db.projects.ensureIndex({timestamp: -1})	

Run the app on localhost	

	$ node app.js
	
Setup admin un/pw
	
	Visit /admin/create - only once
	
	
Linux install
---------------

Almost the same as above. use apt-get vs brew follow other instructions

Start app with forever.js

	$ cd /path/to/node/server
	
	$ forever start -l im_site.log -o im_site_out.log -e im_site_errors.log app.js 

Check out Forevers Console logs

	$ tail -f ~/.forever/im_site.log

Restart Forever and Code

	$ forever restartall

Check if the app is running

	$ forever list







Notes:
---------------

	Beta Beta


