import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import allMiddleware from './middleware';
import allReducers from './reducers';

const middleware = applyMiddleware(promiseMiddleware(), ...allMiddleware);
const reducer = combineReducers(allReducers);
const store = createStore(reducer, undefined, middleware);

export default store;
