require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const server = express();


// connect to mongodb
mongoose.connect(process.env.DB_CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
});
console.log('Connected with MongoDB...');


// server configs
server.use(express.json());
server.use(routes);

// server listening port
server.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}...`));