const mongoose = require('mongoose');

const BuildingSchema = require('./common/schema/building');

const CampusSchema = new BuildingSchema({
  faculties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  }],
  buildings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Campus', CampusSchema);
