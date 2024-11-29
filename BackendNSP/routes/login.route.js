const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.get('/users', loginController.getUser);
router.post('/signup', loginController.signUpUser);
router.post('/login', loginController.loginUser);


module.exports = router;
