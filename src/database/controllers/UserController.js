const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const modelUser = require('./../models/User.js');
const modelPosts = require('./../models/Posts.js');
const PostsController = require('./PostsController.js');
const UserModel = mongoose.model('User');
const PostsModel = mongoose.model('Posts');

module.exports = {
    isLogged: false, 
    currentLogged: '',

    async getUsers (req, res) {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (error) {
            throw new Error(error);
        };
        
        return;
    },
    
    async createUser (req, res) {
        try {
            const saltRounds = 10;
            const hashPwd = bcrypt.hashSync(req.body.password, saltRounds);
            
            const data = {
                login: req.body.login,
                username: req.body.username,
                email: req.body.email,
                password: hashPwd
            };

            const postDBData = {
                username: req.body.username
            };

            await UserModel.create(data);
            await PostsModel.create(postDBData);

            return res.send(req.body);
        } catch (error) {
            throw new Error(error);
        }
    },

    async loginUser (req, res) {
        const {login, password} = req.body;
        
        const userData = await UserModel.findOne({login: login});
        const userHash = userData.password  ;
        const pwdValidate = bcrypt.compareSync(password, userHash);

        if (pwdValidate) {
            this.isLogged = true;
            PostsController.isLogged = true;
            this.currentLogged = userData.username;

            return res.json({ok: true, username: userData.username , code: 200}).status(200);
        } else {
            return res.json({ok: false, login: null, code: 400}).status(400);
        };

    },

    async getUserData (req, res) {
        const {username} = req.params;
        const userData = await UserModel.findOne({username: username});

        const dataToSend = {
            username: userData.username,
            isLoggedUserData: this.currentLogged === username ? true : false
        };

        if (this.isLogged) {
            return res.json(dataToSend);
        } else {
            return res.json({ok: false, message: 'Please login first'});
        }
    }
};