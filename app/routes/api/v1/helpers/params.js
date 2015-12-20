const throwjs = require('throw.js');

const distance = require('./distance-query');

module.exports.identifier = function(model) {
  return function(req, res, next, id) {
    const query = { $or: [{ identifier: id }] };
    if (id.match(/^[0-9a-fA-F]{24}$/)) query.$or.push({ _id: id });

    model.findOne(query)
      .then(resource => {
        req.resource = resource;
        resource ? next() : next(new throwjs.notFound());
        return null;
      })
      .catch(next);
  }
}
