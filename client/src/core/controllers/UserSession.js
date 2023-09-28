import _isEmpty from 'lodash/isEmpty';

import PreferenceController, { Preferences } from 'core/controllers/PreferenceController';

export default class UserSession {
  static initialize({ user }) {
    return new UserSession({ user });
  }

  static removeUserDataFromDisk = async () => {
    await PreferenceController.getInstance().clearPreference(Preferences.LoggedInUser);
  };

  static loadUserFromCache = () =>
    PreferenceController.getInstance()
      .getPreferences(Preferences.LoggedInUser)
      .then(user => {
        if (_isEmpty(user)) {
          return {};
        }

        return user;
      });

  constructor({ user }) {
    this.user = user;
  }

  getUser = async () => {
    if (!_isEmpty(this.user)) {
      return this.user;
    }

    const user = await UserSession.loadUserFromCache();
    if (_isEmpty(user)) {
      return {};
    }

    this.user = user;
    return this.user;
  };

  getCachedUserDetails() {
    return this.user;
  }

  saveUser = async user => {
    this.user = user;
    await PreferenceController.getInstance().setPreferences(Preferences.LoggedInUser, user);
  };

  async cleanUserSession() {
    await UserSession.removeUserDataFromDisk();
    this.user = null;
  }
}
