const express = require('express');
const router = express.Router();
const UserControllers = require('./database/controllers/UserController.js')

router.get('/', UserControllers.getUsers);
router.get('/user/:username', UserControllers.getUserData);
router.post('/create-user', UserControllers.createUser);
router.post('/login', UserControllers.loginUser);
module.exports = router;