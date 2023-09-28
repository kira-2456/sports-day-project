import _isEmpty from 'lodash/isEmpty';

import UserSession from 'core/controllers/UserSession';
import AppController from 'core/controllers/AppController';
import { updateRouterType } from 'navigators/ducks/appRouter';
import { ROUTER_TYPES } from 'navigators/constants/routerConstants';

const initializeUserSession = async () => {
  const user = await UserSession.loadUserFromCache();
  if (!_isEmpty(user)) {
    AppController.getInstance().initializeUserSession({ user });
    AppController.getInstance()
      .getStore()
      .dispatch(updateRouterType({ routerType: ROUTER_TYPES.AUTHORIZED }));
  }
};

export { initializeUserSession };
