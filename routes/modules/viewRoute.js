const express = require('express');
const viewController = require('../../controllers/viewController');

const router = express.Router();

router.get('/users/login', viewController.login);
router.get('/users/signup', viewController.signup);
router.get('/todos/new', viewController.createOne);
router.get('/', viewController.getTodos);
router.get('/todos/:id', viewController.getOne);
router.get('/todos/:id/edit', viewController.edit);

module.exports = router;
