require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
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
server.use(session({
    secret: 'DM0bk5KiJg',
    saveUninitialized: false, 
    resave: false, 
    cookie: {secure: false}
}));
server.use(routes);


// server listening port
server.listen(process.env.PORT, () => console.log(`[Server]: Running on port ${process.env.PORT}...`));