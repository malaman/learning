import request from "superagent";

// Fetchr service to load a photo given an id.

export default {
  name: "makers",

  read(req, resource, { }, config, done) {
    const query = {
    };

    ((query, done) => {

      let endpoint = `/getAllActiveManufacturers`;

      const url = `${config.apiRoot}${endpoint}`;

      debug("Sending GET request to %s", url, query);

      // Consumer key is required by 500px API
      query = assign(query, {
        consumer_key: config.consumerKey
      });

      request.get(url)
        .set("accept-language", locale)
        .query(query)
        .end((err, res) => {
          debug("Received response %s from %s", res && res.status, url);

          if (err) {
            if (err.status) {
              // Normalize statusCode vs. status
              err.statusCode = err.status;
            }

            return done(err);
          }

          done(null, res.body);
        });
  })(query, done);

  }
};
