const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = require('./common/schema/position');

const Place = new PositionSchema({}, {
  timestamps: true
});

module.exports = mongoose.model('Place', Place);
