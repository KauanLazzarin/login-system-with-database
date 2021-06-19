const mongoose = require('mongoose');
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
            await UserModel.create(req.body);
            return res.send(req.body);
        } catch( error) {
            throw new Error(error);
        }
    }
};