import Actions from "../constants/Actions";
import Settings from "../constants/Settings"
import Promise from 'promise';
var request = require('superagent-promise')(require('superagent'), Promise);


const WidgetActionCreators = {
  getMaxAgeAction(actionContext, payload, done) {
    return getMaxAge().then(function (response) {
      actionContext.dispatch(Actions.GET_MAXAGE_SUCCESS, response.text);
      done();
    })
  },

  getManufacturersAction(actionContext, payload) {
    return getManufacturers(payload.year).then(response => {
      actionContext.dispatch(Actions.GET_MANUFACTURERS_SUCCESS, response.text);
    });
  },

  getAllActiveManufacturers(actionContext, payload) {
    return getAllActiveManufacturers().then(response => {
      actionContext.dispatch(Actions.GET_ALL_ACTIVE_MANUFACTURERS_SUCCESS, response.text);
    });
  },

  getModelsAction(actionContext, payload) {
    return getModels(payload).then((response) => {
      actionContext.dispatch(Actions.GET_MODELS_SUCCESS, response.text);
    });
  },

  changeYearAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.YEAR_CHANGED_SUCCESS, payload);
    done();
  },

  changeManufacturerAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.MANUFACTURER_CHANGED_SUCCESS, payload);
    done();
  },

  myCustomAction(actionContext, payload) {
    actionContext.dispatch(Actions.MY_CUSTOM_ACTION_SUCCESS, payload);
  }

};

function getMaxAge() {
  return request('GET', Settings.baseUrl + '/api/getMaxAge');
}

function getManufacturers(year)  {
  return request('GET', Settings.baseUrl + '/api/getManufacturer').query({year: year});
}

function getAllActiveManufacturers() {
  return request('GET', Settings.baseUrl + '/api/getAllActiveManufacturers');
}

function getModels({manufacturer, year}) {
  return request('GET', Settings.baseUrl + '/api/getModels').query({manufacturer, year});
}

export default WidgetActionCreators;


