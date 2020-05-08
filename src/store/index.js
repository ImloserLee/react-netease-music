import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as userReducer from './user/reducer';
import * as musicReducer from './music/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ ...userReducer, ...musicReducer }),
    composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
