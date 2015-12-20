const express = require('express');
const throwjs = require('throw.js');
const Promise = require('bluebird');

const Organization = require('../../../models/organization');
const Campus = require('../../../models/campus');

const prepare = require('./helpers/hateoas');
const params = require('./helpers/params');
const search = require('./helpers/search');

const router = module.exports = express.Router();

router.param('id', params.identifier(Organization));

router.route('/') // organizations?last=g21u3bbashdjb1jh23
  .get((req, res, next) => {
    const last = req.query.last;
    Promise.all([
      Organization.find({ createdAt: { $lte: last || Date.now() }}).limit(10).sort({ createdAt: 'desc'}),
      Organization.count(),
    ]).spread((resources, count) => {
      const first = resources[0];
      const oldest = resources[resources.length - 1];
      resources = prepare.organizations(req, ...resources);
      const result = {
        total: count,
        links: {
          first: `${req.protocol}://${req.headers.host}/api/v1/organizations`,
          next: `${req.protocol}://${req.headers.host}/api/v1/organizations?last=${oldest.createdAt}`,
        },
        data: resources,
      }
      res.send(result);

    }).catch(next);
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
