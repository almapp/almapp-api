const express = require('express');
const throwjs = require('throw.js');
const router = express.Router();

router.use('/v1', require('./v1'));

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'PRODUCTION') {
    delete err.stack;
  }
  res.status(err.statusCode || 500).json(err);
});

module.exports = router;
