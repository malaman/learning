import Actions from "../constants/Actions";
import Api from '../utils/Api';


const WidgetActionCreators = {
  getMaxAgeAction(actionContext, payload, done) {
    return Api.getMaxAge().then(function (response) {
      actionContext.dispatch(Actions.GET_MAXAGE_SUCCESS, response.text);
      done();
    })
  },

  getManufacturersAction(actionContext, payload) {
    return Api.getManufacturers(payload).then(response => {
      actionContext.dispatch(Actions.GET_MANUFACTURERS_SUCCESS, response.text);
    });
  },

  getAllActiveManufacturers(actionContext, payload) {
    return Api.getAllActiveManufacturers().then(response => {
      actionContext.dispatch(Actions.GET_ALL_ACTIVE_MANUFACTURERS_SUCCESS, response.text);
    });
  },

  getModelsAction(actionContext, payload) {
    return Api.getModels(payload).then((response) => {
      actionContext.dispatch(Actions.GET_MODELS_SUCCESS, response.text);
    });
  },

  getSeriesAction(actionContext, payload) {
    return Api.getSeries(payload).then(response => {
      actionContext.dispatch(Actions.GET_SERIES_SUCCESS, response.text);
    });
  },

  getModificationsAction(actionContext, payload) {
    return Api.getModifications(payload).then(response => {
      actionContext.dispatch(Actions.GET_MODIFICATIONS_SUCCESS, response.text);
    });
  },

  getAllRegionsAction(actionContext, payload) {
    return Api.getAllRegions().then(response => {
      actionContext.dispatch(Actions.GET_ALL_REGIONS_SUCCESS, response.text);
    })
  },

  changeStepAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.STEP_CHANGED_SUCCESS, payload);
    done();
  },

  changeYearAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.YEAR_CHANGED_SUCCESS, payload);
    done();
  },

  changeManufacturerAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.MANUFACTURER_CHANGED_SUCCESS, payload);
    done();
  },
  changeModelAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.MODEL_CHANGED_SUCCESS, payload);
    done();
  },

  changeSeriaAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.SERIA_CHANGED_SUCCESS, payload);
    done();
  },

  changeModificationAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.MODIFICATION_CHANGED_SUCCESS, payload);
    done();
  },

  changeRegionAction(actionContext, payload, done) {
    actionContext.dispatch(Actions.REGION_CHANGED_SUCCESS, payload);
    done();
  }

};

export default WidgetActionCreators;


