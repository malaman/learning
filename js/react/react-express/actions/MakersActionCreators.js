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
      actionContext.dispatch(Actions.LOAD_MODELS_LIST, data);
      done();
    });
  }
};

export default MakersActionCreators;