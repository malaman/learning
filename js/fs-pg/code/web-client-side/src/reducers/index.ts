import {combineReducers} from 'redux';
import ui from './ui';
import user from './user';

/**
 * application reducers are combined here
 */
const rootReducer: any = combineReducers({
  ui,
  user
});

export default rootReducer;
