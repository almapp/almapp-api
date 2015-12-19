const elasticsearch = require('elasticsearch');
const bluebird = require("bluebird");

const config = require('./index');

module.exports = new elasticsearch.Client({
  host: config.get('elasticsearch:uri'),
  log: 'trace',
  defer: () => bluebird.defer(),
});
