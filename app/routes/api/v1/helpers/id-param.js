const throwjs = require('throw.js');

module.exports = function(model) {
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
