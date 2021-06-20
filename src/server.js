const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const server = express();


// connect to mongodb
mongoose.connect('mongodb://localhost:27017/project-test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
});
console.log('Connected with MongoDB...');


// server configs
server.use(express.json());
server.use(routes);

// server listening port
server.listen(3003, () => console.log(`Server is running on port 3003...`));