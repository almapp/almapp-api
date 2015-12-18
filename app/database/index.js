const mongoose = require('mongoose');

const config = require('../config');

// Database connection and setup
mongoose.Promise = global.Promise;

module.exports = mongoose.connect(config.get('mongo:uri'));
