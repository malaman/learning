import Actions from "../configs/Actions";
import debugLib from 'debug';

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
    }
};

export default MakersActionCreators;