const router = require('express').Router();
const authContoller = require("../../controllers/auth.controller.js");

router.post('/', authContoller.login);

module.exports = router;