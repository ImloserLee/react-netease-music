import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as userReducer from './user/reducer';
import * as homeReducer from './home/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ ...userReducer, ...homeReducer }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
