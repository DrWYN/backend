import { createStore, applyMiddleware, combineReducers } from 'redux';
import apiMiddleware from '../middleware/api';


import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware
)(createStore);


function configureStore(reducer, initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

let store = configureStore(rootReducer);

export default store;