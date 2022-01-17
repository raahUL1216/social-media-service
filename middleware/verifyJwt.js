const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.verifyToken = (req, res, next) => {
	const token = getTokenFromHeader(req);
	if (!token) {
		return res.status(403).send({
			message: "No token provided!"
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!"
			});
		}

		req.userId = decoded.userId;

		next();
	});
};

const getTokenFromHeader = (req) => {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
		req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	}

	return null;
}