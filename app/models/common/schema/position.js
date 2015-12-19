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
      lowercase: true,
      es_indexed: true,
    },
    name: {
      type: String,
      es_indexed: true,
    },
    information: {
      type: String,
    },
    position: {
      geo_point: {
        type: String,
        es_type: 'geo_point',
        es_lat_lon: true,
        es_indexed: true,
      },
      lat: {
        type: Number,
        min: -85,
        max: 85,
      },
      lon: {
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
