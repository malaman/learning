import keyMirror from "react/lib/keyMirror";

const Actions = keyMirror({
  LOAD_MAKERS_LIST: null,
  LOAD_MODELS_LIST: null,

  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null

});


export default Actions;
