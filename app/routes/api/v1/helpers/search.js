const throwjs = require('throw.js');

const distance = require('./distance-query');

module.exports.middleware = function(req, res, next) {
  const query = distance(req.query);
  console.log('goa');
  if (query) {
    req.search = { query: query };
    next();
  } else {
    next(new throwjs.badRequest('empty search query'));
  }
}
