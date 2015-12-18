const express = require('express');
const router = express.Router();

const Organization = require('../../../models/organization');

router.route('/')
  .get((req, res, next) => {
    Organization.find({}).then(value => res.send(value)).catch(next);
  });

router.route('/:id')
  .get((req, res, next) => {
    Organization.findOne({ _id: req.params.id }).then(value => res.send(value)).catch(next);
  });

module.exports = router;
