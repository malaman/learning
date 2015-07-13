'use strict';
import Settings from "../constants/Settings"
import Promise from 'promise';
var request = require('superagent-promise')(require('superagent'), Promise);

const Api = {
  getMaxAge() {
    return request('GET', Settings.baseUrl + '/api/getMaxAge');
  },
  getManufacturers(year)  {
    return request('GET', Settings.baseUrl + '/api/getManufacturer').query(year);
  },
  getAllActiveManufacturers() {
    return request('GET', Settings.baseUrl + '/api/getAllActiveManufacturers');
  },

  getModels({manufacturer, year}) {
    return request('GET', Settings.baseUrl + '/api/getModels').query({manufacturer, year});
  },
  getSeries({model, year}) {
    return request('GET', Settings.baseUrl + '/api/getSeries').query({model, year});
  },
  getModifications(seria) {
    return request('GET', Settings.baseUrl + '/api/getBody').query(seria);
  },
  getAllRegions() {
    return request('GET', Settings.baseUrl + '/api/getAllRegions')
  }
};

export default Api;