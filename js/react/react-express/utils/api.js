import request from "superagent";
import {apiRoot} from '../configs/general';
import debugLib from 'debug';

const debug = debugLib('catalog');


const api = {
  get(endpoint, query, done) {
    const url = `${apiRoot}${endpoint}`;
    debug("Sending GET request to %s", url, query);

    request.get(url)
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
  }

};


export default api;