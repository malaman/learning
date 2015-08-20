import {get} from '../utils/api';

export default {
  name: "models",

  read(req, resource, params, config, callback) {
    get('/getModels', params, callback);
  }
};
