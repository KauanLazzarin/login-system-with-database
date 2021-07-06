const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    posts: {
        type: Array,
        required: true,
        default: []
    }
});

mongoose.model('Posts', PostsSchema);