const express = require('express');
const throwjs = require('throw.js');

const Organization = require('../../../models/organization');
const Campus = require('../../../models/campus');

const prepare = require('./helpers/hateoas');
const param = require('./helpers/id-param');
const distance = require('./helpers/distance-query');

const router = module.exports = express.Router();

router.param('id', param(Organization));

router.route('/')
  .get((req, res, next) => {
    Organization.find()
      .then(resources => res.send(prepare.organizations(req, ...resources)))
      .catch(next);
  });

router.route('/search') // search?q=B23&lat=1&lon=2&distance=1km
  .get((req, res, next) => {
    const query = distance(req.query);

    if (!query) {
      return next(new throwjs.badRequest('empty search query'));
    }

    Organization.search(query)
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
