import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import promise from './promise';
import rootReducer from './reducers';
import { batch } from './reduxBatchDispatch';

let store = null;

function getInitialState() {
  return {};
}

export default function configureStore(initialState = getInitialState()) {
  if (store) {
    return store;
  }

  const middlewares = [thunk, promise, batch];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

  return store;
}
