const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Promise = require("bluebird");

const BuildingSchema = require('./common/schema/building');
const elasticsearch = require('./../config/elasticsearch');

const OrganizationSchema = new BuildingSchema({
  campuses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campus',
  }],
}, {
  timestamps: true,
});

OrganizationSchema.plugin(mongoosastic, {
  esClient: elasticsearch,
  hydrate: true,
})

const Organization = mongoose.model('Organization', OrganizationSchema);
Organization.search = Promise.promisify(Organization.search, {
  context: Organization,
});

module.exports = Organization;
