const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = require('./common/schema/building');

const Organization = new BuildingSchema({
  campuses: [{
    type: Schema.Types.ObjectId,
    ref: 'Campus',
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Organization', Organization);
