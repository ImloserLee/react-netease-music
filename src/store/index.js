import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as appReducer from './app/reducer';
import * as homeReducer from './home/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ ...appReducer, ...homeReducer }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
