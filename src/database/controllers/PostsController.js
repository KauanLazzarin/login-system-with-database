const mongoose = require('mongoose');
const model = require('./../models/Posts.js');
const PostsModel = mongoose.model('Posts');

module.exports = {
    isLogged: false,

    async getPosts (req, res) {
        const {username} = req.params;
        try {
            if (this.isLogged) {
                const posts = await PostsModel.findOne({username: username});
                return res.json(posts);  
            } else {
                return res.json({ok: false});
            }
        } catch (error) {
            return res.send('Something went wrong').status(400);
        };
    },

    async createPost (req, res) {
        const {username} = req.params;

        try {
            
        } catch (error) {
            return res.send('Something went wrong').status(400);
        }
    }
};