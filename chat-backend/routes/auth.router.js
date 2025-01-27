const Authrouter = require('express').Router();
const authController = require('../controllers/auth.controller');

Authrouter.post('/register', authController.Register, authController.sentOTP, authController.verfiyOTP);
Authrouter.post('/resend-otp', authController.resendOTP);
Authrouter.post('/verify-otp', authController.verfiyOTP);
Authrouter.post('/login', authController.login);

module.exports = Authrouter;