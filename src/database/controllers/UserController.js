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
        } catch( error) {
            throw new Error(error);
        }
    }
};