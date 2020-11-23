const express = require('express');
const todoController = require('../../controllers/todoController');

const router = express.Router();

router.post('/', todoController.create);
router.patch('/:id', todoController.edit);
router.delete('/:id', todoController.delete);

module.exports = router;
