const mongoose = require('mongoose');

const BuildingSchema = require('./common/schema/building');

const FacultySchema = new BuildingSchema({
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Faculty', FacultySchema);
