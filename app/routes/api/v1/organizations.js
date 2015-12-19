const express = require('express');
const throwjs = require('throw.js');
const router = express.Router();

const Organization = require('../../../models/organization');
const Campus = require('../../../models/campus');

function prepare(req, ...resources) {
  return resources.map(r => r.toObject()).map(resource => {
    resource.links = {
      self: {
        href: `${req.protocol}://${req.headers.host}/api/v1/organizations/${resource._id}`,
      },
      campuses: {
        href: `${req.protocol}://${req.headers.host}/api/v1/organizations/${resource._id}/campuses`,
      }
    };
    return resource;
  });
}

router.param('id', (req, res, next, id) => {
  Organization.findOne({ _id: id }).then(resource => {
    req.resource = resource;
    resource ? next() : next(new throwjs.notFound());
  }).catch(next);
});

router.route('/')
  .get((req, res, next) => {
    Organization.find()
      .then(resources => res.send(prepare(req, ...resources)))
      .catch(next);
  });

router.route('/:id')
  .get((req, res, next) => {
    res.send(prepare(req, req.resource));
  });

router.route('/:id/campuses')
  .get((req, res, next) => {
    Organization.populate(req.resource, { path: 'campuses' }).then(resource => {
      res.send(resource.campuses);
    }); // TODO: catch using promises
  });

module.exports = router;
