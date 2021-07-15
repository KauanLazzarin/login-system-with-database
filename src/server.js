require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bp = require('body-parser');
const cors = require('cors');
const routes = require('./routes.js');
const server = express();

// connect to mongodb
mongoose.connect(process.env.DB_CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
});

console.log("\x1b[36m",'[Server]: Connected with MongoDB...');


// server configs
server.use(cors());
server.use(express.json());
server.use(bp.urlencoded({extended: true}));
server.use(express.static('public'));
server.use(session({
    secret: 'DM0bk5KiJg',
    saveUninitialized: false, 
    resave: true
}));
server.use(routes);


// server listening port
server.listen(process.env.PORT, () => console.log(`[Server]: Running on port ${process.env.PORT}...`));