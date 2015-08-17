import Actions from "../configs/Actions";
import debugLib from 'debug';

const TIMEOUT = 20000;
const debug = debugLib('catalog');

const MakersActionCreators = {
    getMakersAction(actionContext, payload, done) {
      actionContext.service.read("makers", {}, {timeout: TIMEOUT}, (err, data) => {
        debug('Received data: ' + data);
        actionContext.dispatch(Actions.LOAD_MAKERS_LIST, data);
        done();
      });
      done();
    }
};

export default MakersActionCreators;