const express = require('express');
const throwjs = require('throw.js');

const Organization = require('../../../models/organization');
const Campus = require('../../../models/campus');

const prepare = require('./helpers/hateoas');
const params = require('./helpers/params');
const search = require('./helpers/search');

const router = module.exports = express.Router();

router.param('id', params.identifier(Organization));

router.route('/')
  .get((req, res, next) => {
    Organization.find()
      .then(resources => res.send(prepare.organizations(req, ...resources)))
      .catch(next);
  });

router.route('/search') // search?q=B23&lat=1&lon=2&distance=1km
  .get(search.middleware, (req, res, next) => {
    Organization.search(req.search.query)
      .then(results => results.hits.hits)
      .then(resources => res.send(prepare.organizations(req, ...resources)))
      .catch(next);
  });

router.route('/:id')
  .get((req, res, next) => res.send(prepare.organizations(req, req.resource)));

router.route('/:id/campuses')
  .get((req, res, next) => {
    const options = {
      path: 'campuses',
    };
    req.resource.populate(options).execPopulate()
      .then(resource => resource.campuses)
      .then(resources => res.send(prepare.campuses(req, ...resources)));
  });
