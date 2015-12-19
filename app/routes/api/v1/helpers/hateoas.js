module.exports.organizations = function(req, ...resources) {
  return resources.map(r => r.toObject()).map(resource => {
    resource.links = {
      self: {
        href: `${req.protocol}://${req.headers.host}/api/v1/organizations/${resource._id}`,
      },
      campuses: {
        href: `${req.protocol}://${req.headers.host}/api/v1/organizations/${resource._id}/campuses`,
      }
    };
    return resource;
  });
}

module.exports.campuses = function(req, ...resources) {
  return resources.map(r => r.toObject()).map(resource => {
    resource.links = {
      self: {
        href: `${req.protocol}://${req.headers.host}/api/v1/campuses/${resource._id}`,
      },
    };
    return resource;
  });
}
