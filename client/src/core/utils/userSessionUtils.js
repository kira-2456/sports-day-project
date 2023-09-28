import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import { safeExec } from 'core/utils/general';
import AppController from 'core/controllers/AppController';

const userSessionUtils = {
  isAuthorized() {
    try {
      const user = AppController.getUserSession() && AppController.getUserSession().getCachedUserDetails();
      return !_isEmpty(user);
    } catch (e) {
      return false;
    }
  },

  getUserId() {
    const userSession = AppController.getUserSession();
    if (!userSession) {
      return null;
    }
    return _get(userSession, ['user', 'id']);
  },

  getUser() {
    return safeExec(() => AppController.getUserSession().getCachedUserDetails());
  },
};

module.exports = userSessionUtils;
