import {get} from '../utils/api';

export default {
  name: "makers",

  read(req, resource, params, config, callback) {
    console.log(arguments);
    get('/getAllActiveManufacturers', params, callback);
  }
};
