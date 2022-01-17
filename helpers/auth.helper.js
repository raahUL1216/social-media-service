const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");

exports.generateJWT = (userId) => {
	let token;

	try {
		token = jwt.sign({ userId: userId }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error while generating auth token.');
	}

	return token;
}