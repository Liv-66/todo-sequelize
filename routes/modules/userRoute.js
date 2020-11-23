const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();

router.post('/login', userController.checkLoginForm, userController.login);
router.post('/signup', userController.signup);
router.get('/logout', userController.logout);

module.exports = router;
