const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');
const { signupValidation, signinValidation } = require('../middleware/validation');

// Auth routes
router.post('/signup', signupValidation, signup);
router.post('/signin', signinValidation, signin);

module.exports = router;