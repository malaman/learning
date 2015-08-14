import Actions from "../configs/Actions";


const MakersActionCreators = {
    getMaxAgeAction(actionContext, payload, done) {

      actionContext.dispatch(Actions.LOAD_MAKERS_LIST, response.text);
      done();
    }
}


export default MakersActionCreators;