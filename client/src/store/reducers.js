import { combineReducers } from 'redux';

import appRouter, { APP_ROUTER_KEY, initialState as initialAppRouterState } from 'navigators/ducks/appRouter';
import user, { USER_KEY, initialState as initialUserState } from 'modules/auth/ducks/user';
import events, { EVENT_KEY, initialState as initialEventsState } from 'modules/home/ducks/events';

import { batching } from './reduxBatchDispatch';

export const RESET_STORE_ACTION_TYPE = 'RESET_APP';

const initialAppState = {
  [APP_ROUTER_KEY]: initialAppRouterState,
  [USER_KEY]: initialUserState,
  [EVENT_KEY]: initialEventsState,
};

const appReducer = () => {
  return batching(
    combineReducers({
      // Add App reducers here
      [APP_ROUTER_KEY]: appRouter,
      [USER_KEY]: user,
      [EVENT_KEY]: events,
    })
  );
};

const composeResetReducer = (state, action) => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    return initialAppState;
  }

  return appReducer()(state, action);
};

export default composeResetReducer;
