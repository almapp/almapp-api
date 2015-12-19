module.exports = function(options) {
  if (!options.q && !(options.lat && options.lon)) {
    return null;
  }

  const query = {
    bool: {},
  };

  if (options.query) {
    query.bool.must = {
      query_string: {
        query: options.q,
      },
    };
  }

  if (options.lat && options.lon) {
    query.bool.filter = {
      geo_distance: {
        distance: options.distance || '1km',
        position: {
          lat: options.lat,
          lon: options.lon,
        },
      },
    };
  }

  return query;
}
