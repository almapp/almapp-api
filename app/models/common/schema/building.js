const mongoose = require('mongoose');
const util = require('util');

const PositionSchema = require('./position');

function BuildingSchema() {
  PositionSchema.apply(this, arguments);

  this.add({
    abbreviation: {
      type: String,
    },
    short_name: {
      type: String,
    },
    address: {
      type: String,
    },
    contact: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      url: {
        type: String,
      },
      social: {
        facebook: {
          type: String,
        },
        twitter: {
          type: String,
        },
      },
    },
  });
}
util.inherits(BuildingSchema, PositionSchema);

module.exports = BuildingSchema;
