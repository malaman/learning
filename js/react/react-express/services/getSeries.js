import {get} from '../utils/api';

export default {
  name: "series",

  read(req, resource, params, config, callback) {
    get('/getSeries', params, callback);
  }
};
