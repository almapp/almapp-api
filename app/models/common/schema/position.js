const mongoose = require('mongoose');
const util = require('util');

const Schema = mongoose.Schema;

function PositionSchema() {
  Schema.apply(this, arguments);

  this.add({
    identifier: {
      type: String,
      index: true,
      required: true,
      unique: true,
      uppercase: true,
    },
    name: {
      type: String,
    },
    information: {
      type: String,
    },
    position: {
      latitude: {
        type: Number,
        min: -85,
        max: 85,
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180,
      },
      floor: {
        type: Number,
      },
      zoom: {
        type: Number,
      },
      angle: {
        type: Number,
      },
      tilt: {
        type: Number,
      },
    },
  });
}
util.inherits(PositionSchema, Schema);

module.exports = PositionSchema;
