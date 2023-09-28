import _isEmpty from 'lodash/isEmpty';

import UserSession from 'core/controllers/UserSession';
import AppController from 'core/controllers/AppController';

const initializeUserSession = async () => {
  const user = await UserSession.loadUserFromCache();
  if (!_isEmpty(user)) {
    AppController.getInstance().initializeUserSession({ user });
  }
};

export { initializeUserSession };
