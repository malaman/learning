import {get} from '../utils/api';

export default {
  name: "modifications",

  read(req, resource, params, config, callback) {
    get('/getBody', params, callback);
  }
};
