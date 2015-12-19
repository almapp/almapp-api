const mongoose = require('mongoose');

const BuildingSchema = require('./common/schema/building');

const BuildingSch = new BuildingSchema({
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Building', BuildingSch);
