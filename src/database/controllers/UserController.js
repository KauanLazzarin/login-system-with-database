const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const model = require('./../models/User.js');
const UserModel = mongoose.model('User');

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

            await UserModel.create(data);

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
        };
        
        const currentLoggedData = {
            username: userData.username, 
            isLogged: true
        };

        if (this.isLogged && this.currentLogged === username) {
            return res.json(currentLoggedData);
        } else if (this.isLogged) {
            return res.json(dataToSend);
        } else {
            return res.json({ok: false, message: 'Please login first'});
        }
    }
};