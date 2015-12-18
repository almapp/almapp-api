const express = require('express');
const throwjs = require('throw.js');
const router = express.Router();

const Organization = require('../../../models/organization');
const Campus = require('../../../models/campus');

router.route('/')
  .get((req, res, next) => {
    Organization.find().then(value => res.send(value)).catch(next);
  });

router.param('id', (req, res, next, id) => {
  Organization.findOne({ _id: id }).then(resource => {
    req.resource = resource;
    resource ? next() : next(new throwjs.notFound());
  }).catch(next);
});

router.route('/:id')
  .get((req, res, next) => {
    res.send(req.resource);
  });

router.route('/:id/campuses')
  .get((req, res, next) => {
    Organization.populate(req.resource, { path: 'campuses' }).then(resource => {
      res.send(resource.campuses);
    }); // TODO: catch using promises
  });

module.exports = router;
