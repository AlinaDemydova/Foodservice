# Backend

--------------- Folder structure --------------------

Project:
1. Frontend (e2e, node_modules, src).
2. Backend (models, node_modules).
3. mongodb (bin).

------------In folder "Backend"-----------
1. Install NodeJS
https://nodejs.org/uk/

2. Create package json file in db folder
npm init

3. Express:
https://expressjs.com
npm install express --save

4. Mongoose:
https://mongoosejs.com/
npm i mongoose

5. Nodemon (auto restart server)
npm install --save-dev nodemon
Run by command "nodemon server.js"

6. Mongoose-unique-validator - for unique users
npm install mongoose-unique-validator

7. Bcrypt - for sending passwords
npm install bcrypt
(For the installing bcrypt you may need additional)

8. Multer - to work with images
npm install multer

------------In folder "mongodb"-----------
1. Download MongoDB
https://www.mongodb.com/download-center/community

	Choose Setup Type: Custom
	Set path to the project --> folder "mongodb"

	Folders structure:
		project - includes 3 folders:
			1.Frontend
			2.Backend
			3.mongodb

2. Create folder 'db' in 'data'
3. Own folder to each db + path to save all data
	In my case:
	G:\GL\copy-project\mongodb\bin>mongod --directoryperdb --dbpath G:\GL\copy-project\mongodb\data\db

4. Start service:
G:\GL\copy-project\mongodb\bin>net start MongoDB


