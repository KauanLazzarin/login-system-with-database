const express = require('express');
const router = express.Router();
const UserControllers = require('./database/controllers/UserController.js');
const PostsController = require('./database/controllers/PostsController.js');

// home route
router.get('/', UserControllers.getUsers);

// get user data by username
router.get('/user/:username', UserControllers.getUserData);

// get user posts by username
router.get('/user/:username/posts', PostsController.getPosts);

// create user 
router.post('/create-user', UserControllers.createUser);

// create post 
router.post('/user/:username/posts/create', PostsController.createPost);

// login 
router.post('/login', UserControllers.loginUser);

module.exports = router;