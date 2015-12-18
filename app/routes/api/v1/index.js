const express = require('express');
const router = express.Router();

router.use('/organizations', require('./organizations'));

module.exports = router;
