const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const model = require('./../models/User.js');
const UserModel = mongoose.model('User');

module.exports = {
    async getUsers (req, res) {
        try {
            const users = await UserModel.find();
            res.send(users);
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
        const userHash = userData.password;
        const pwdValidate =  bcrypt.compareSync(password, userHash);


        if (pwdValidate) {
            res.send('pwd is ok')
        } else {
            res.send('pwd is not ok')
        };
    }
};