import { combineReducers } from 'redux';

import appRouter, { APP_ROUTER_KEY, initialState as initialAppRouterState } from 'navigators/ducks/appRouter';

import { batching } from './reduxBatchDispatch';

export const RESET_STORE_ACTION_TYPE = 'RESET_APP';

const initialAppState = {
  [APP_ROUTER_KEY]: initialAppRouterState,
};

function appReducer(asyncReducers) {
  return batching(
    combineReducers(
      {
        // Add App reducers here
        [APP_ROUTER_KEY]: appRouter,
      },
      asyncReducers
    )
  );
}

export default function composeResetReducer(state, action, asyncReducers = {}) {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    return initialAppState;
  }

  return appReducer(asyncReducers)(state, action);
}
