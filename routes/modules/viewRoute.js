const express = require('express');
const viewController = require('../../controllers/viewController');
const authController = require('../../controllers/authController');

const router = express.Router();

router.get('/users/login', viewController.login);
router.get('/users/signup', viewController.signup);
router.get('/', authController.isLogedIn, viewController.getTodos);
router.get('/todos/new', authController.isLogedIn, viewController.createOne);
router.get('/todos/:id', authController.isLogedIn, viewController.getOne);
router.get('/todos/:id/edit', authController.isLogedIn, viewController.edit);

module.exports = router;
