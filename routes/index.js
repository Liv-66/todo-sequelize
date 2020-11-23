const express = require('express');
const userRoute = require('./modules/userRoute');
const authRoute = require('./modules/authRoute');
const todoRoute = require('./modules/todoRoute');
const viewRoute = require('./modules/viewRoute');

const router = express.Router();

router.use('/', viewRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/todos', todoRoute);

module.exports = router;
