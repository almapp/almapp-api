const throwjs = require('throw.js');

module.exports = function(model) {
  return function(req, res, next, id) {
    model.findOne({ _id: id })
      .then(resource => {
        req.resource = resource;
        resource ? next() : next(new throwjs.notFound());
        return null;
      })
      .catch(next);
  }
}
