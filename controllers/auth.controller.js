const authHelper = require('../helpers/auth.helper');
const userHelper = require('../helpers/user.helper');

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) {
		return res.status(422).json({ errors: { email: "can't be blank" } });
	}

	if (!password) {
		return res.status(422).json({ errors: { password: "can't be blank" } });
	}

	try {
		const userId = await userHelper.createUser(email, password);

		const jwtToken = authHelper.generateJWT(userId);
		return res.status(200).json({ token: jwtToken });
	}
	catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}