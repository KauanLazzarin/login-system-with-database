const express = require('express');
const router = express.Router();
const UserControllers = require('./database/controllers/UserController.js')

router.get('/', UserControllers.getUsers);
router.post('/create-user', UserControllers.createUser);

module.exports = router;