const mongoose = require('mongoose');

const PositionSchema = require('./common/schema/position');

const PlaceSchema = new PositionSchema({}, {
  timestamps: true,
});

module.exports = mongoose.model('Place', PlaceSchema);
