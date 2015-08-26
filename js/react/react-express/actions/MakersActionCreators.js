import Actions from "../configs/Actions";
import debugLib from 'debug';
import {year} from '../configs/general';

const TIMEOUT = 20000;
const debug = debugLib('catalog');

const MakersActionCreators = {
  getMakersAction(actionContext, payload, done) {
    actionContext.service.read("makers", {}, {timeout: TIMEOUT}, (err, data) => {
      if (err) {
        return done(err);
      }
      actionContext.dispatch(Actions.LOAD_MAKERS_LIST, data);
      done();
    });
  },
  getMakerAction(actionContext, payload, done) {
    const manufacturer = payload.getIn(['params', 'makerId']);
    const params = {manufacturer, year};

    actionContext.service.read("models", params, {timeout: TIMEOUT}, (err, data) => {
      if (err) {
        return done(err);
      }
      actionContext.dispatch(Actions.LOAD_MODELS_LIST, {data, manufacturer});
      done();
    });
  },
  getSeriesAction(actionContext, payload, done) {

    const manufacturer = payload.getIn(['params', 'makerId']);
    const model = payload.getIn(['params', 'modelId']);
    const params = {model, year};

    actionContext.service.read("series", params, {timeout: TIMEOUT}, (err, data) => {
      if (err) {
        return done(err);
      }
      actionContext.dispatch(Actions.LOAD_SERIES_LIST, {data, manufacturer, model});
      done();
    });
  },
  getModificationsList(actionContext, payload, done) {

    const manufacturer = payload.getIn(['params', 'makerId']);
    const model = payload.getIn(['params', 'modelId']);
    const seria = payload.getIn(['params', 'seriaId']);
    const params = {seria};

    actionContext.service.read("modifications", params, {timeout: TIMEOUT}, (err, data) => {
      if (err) {
        return done(err);
      }
      actionContext.dispatch(Actions.LOAD_SERIES_LIST, {data, manufacturer, model, seria});
      done();
    });
  }
};

export default MakersActionCreators;