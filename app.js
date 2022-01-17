const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const { sequelize } = require("./models");

require('dotenv').config();

let isProduction = process.env.NODE_ENV === 'production';

const app = express();
const port = process.env.PORT || 3002;

if (!isProduction) {
	app.use(errorhandler());
}

// Add headers before the routes are defined
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Pass to next layer of middleware
	next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Welcome to social media app." });
});

app.use(require('./routes'));

app.listen(port, async () => {
	console.log(`Social Media App listening at http://localhost:${port}`);

	// uncomment below code to drop & sync database from models
	/* 
	await sequelize.sync({ force: true, match: /_media_app$/ }).then(() => {
		  console.log('Database synced.');
	});
	*/

	await sequelize.authenticate();
	console.log('Database connected.');
})