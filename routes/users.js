var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

// User register
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

module.exports = router;
