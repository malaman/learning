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
  },

  determinePrice({year, maker, model, seria, modification, odometer, email, region}) {
    const query = {
      id: null,
      car: {
        year: year,
        maker: {ru_name: maker.text, id: maker.value},
        model: {ru_name: model.text, id: model.value, show_price_range: false, ignore_price: false},
        seria: {ru_name: seria.text, id: seria.value},
        modification: {ru_name: modification.text, id: modification.value},
        drivable: true,
        damaged: false,
        commercial_purposes: false,
        loss_flood: false,
        odometer_changed: false,
        accident: false,
        odometer: odometer
      },
      utm_source: "",
      region: {id: region.value},
      contact: {email: email, lang: "ru"},
      clarification: false
    };
    return request('POST', Settings.baseUrl + '/api/determine_price').send(query);
  }
};

export default Api;