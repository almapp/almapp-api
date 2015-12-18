const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = require('./common/schema/building');

const Campus = new BuildingSchema({
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
  }],
  buildings: [{
    type: Schema.Types.ObjectId,
    ref: 'Building',
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Campus', Campus);
