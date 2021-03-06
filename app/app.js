// Node imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Local imports
const config = require('./config');
const database = require('./config/database');

// Webapp
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.enable('trust proxy');

// Logs
app.use(morgan('dev'));

// Index
app.get("/", (req, res) => {
    res.send({ status: 'on' });
});

// REST API Routes
app.use('/api', require('./routes/api'));

module.exports.server = app;
module.exports.config = config;
module.exports.database = database;
