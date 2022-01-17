var router = require('express').Router();
// var passport = require('passport');
var auth = require('../auth');
const user = require("../../controllers/user.controller.js");


router.get('/user', auth.required, function (req, res, next) {

});

router.put('/user', auth.required, function (req, res, next) {

});

router.post('/users/login', function (req, res, next) {
	// if (!req.body.user.email) {
	// 	return res.status(422).json({ errors: { email: "can't be blank" } });
	// }

	// if (!req.body.user.password) {
	// 	return res.status(422).json({ errors: { password: "can't be blank" } });
	// }

	// passport.authenticate('local', { session: false }, function (err, user, info) {
	// 	if (err) { return next(err); }

	// 	if (user) {
	// 		user.token = user.generateJWT();
	// 		return res.json({ user: user.toAuthJSON() });
	// 	} else {
	// 		return res.status(422).json(info);
	// 	}
	// })(req, res, next);
});

router.post('/users', function (req, res, next) {
	// var user = new User();

	// user.username = req.body.user.username;
	// user.email = req.body.user.email;
	// user.setPassword(req.body.user.password);

	// user.save().then(function () {
	// 	return res.json({ user: user.toAuthJSON() });
	// }).catch(next);
});


// Create a new Tutorial
router.post("/", user.create);

// Retrieve all Tutorials
router.get("/", user.findAll);

// Retrieve all published Tutorials
router.get("/published", user.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", user.findOne);

// Update a Tutorial with id
router.put("/:id", user.update);

// Delete a Tutorial with id
router.delete("/:id", user.delete);

// Delete all Tutorials
router.delete("/", user.deleteAll);

module.exports = router;