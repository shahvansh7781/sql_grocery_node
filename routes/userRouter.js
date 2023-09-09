const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { mydirectus } = require('../controllers/directusController');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/directus").get(mydirectus);

module.exports = router;