import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
const createLogger = require('redux-logger');
// import { DevTools } from '../containers/DevTools.js';

const logger: any = createLogger();
/**
 * thunk, logger, promiseMiddleware are used as redux middleware
 *
 * uncomment logger to receive debug information in browser console
 */
const finalCreateStore = compose(
  applyMiddleware(logger, thunk, promiseMiddleware())
  // DevTools.instrument()
)(createStore);

export function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
