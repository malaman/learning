import {get} from '../utils/api';

export default {
  name: "makers",

  read(req, resource, params, config, callback) {
    get('/getAllActiveManufacturers', params, callback);
  }
};
