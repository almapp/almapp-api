const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = require('./common/schema/building');

const Building = new BuildingSchema({
  places: [{
    type: Schema.Types.ObjectId,
    ref: 'Place',
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Building', Building);
