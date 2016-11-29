import { combineReducers } from 'redux';
import ui from './ui';

/**
 * application reducers are combined here
 */
const rootReducer: any = combineReducers({
    ui
});

export default rootReducer;
