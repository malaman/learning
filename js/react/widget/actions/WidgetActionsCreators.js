import Actions from "../constants/Actions";
import Settings from "../constants/Settings"

var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);


const WidgetActionCreators = {
  getManufacturersAction(actionContext, payload) {
    return getManufacturers(payload.year).then(function(response) {
      actionContext.dispatch(Actions.GET_MANUFACTURERS_SUCCESS, response.text);
    });
  },

  getMaxAgeAction(actionContext, payload, done) {
    return getMaxAge().then(function (response) {
      actionContext.dispatch(Actions.GET_MAXAGE_SUCCESS, response.text);
      done();
    })
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
  return request('GET', Settings.baseUrl + '/api/getManufacturer').query({year: year})
}


export default WidgetActionCreators;


