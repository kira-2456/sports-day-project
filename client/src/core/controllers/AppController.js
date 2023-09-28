import _isEmpty from 'lodash/isEmpty';

import { RESET_STORE_ACTION_TYPE } from 'store/reducers';
import ApiClient from 'core/modules/ApiClient';

// controllers
import UserSession from 'core/controllers/UserSession';
import PreferenceController from 'core/controllers/PreferenceController';

import configureStore from 'store/configureStore';
import { getApiConfig } from 'core/utils/apiUtils';
import { initializeUser } from 'modules/auth/ducks/user';

let instance = null;

export default class AppController {
  static initialize(config) {
    return instance || new AppController(config);
  }

  static getInstance() {
    return instance;
  }

  constructor(config) {
    if (instance) {
      return instance;
    }

    this.init(config);
    instance = this;
  }

  init() {
    this.store = configureStore();
    this.userSession = null;
    this.apiClient = ApiClient.create(getApiConfig());
  }

  getStore() {
    return this.store;
  }

  onUserLogin = ({ user }) => {
    this.initializeUserSession({ user });
    return this.userSession.saveUser(user);
  };

  initializeUserSession = ({ user }) => {
    if (_isEmpty(user)) {
      return;
    }

    this.userSession = UserSession.initialize({ user });
    this.store.dispatch(initializeUser(user));
  };

  onUserLogout = async () => {
    await this.__cleanUserSession();
    await this.cleanupPreferences();
    this.apiClient.clear();
    this.resetStore();
  };

  cleanupPreferences = async () => {
    // Project specific preferences should persist after logout in web
    await PreferenceController.getInstance().clearAllPreferences();
  };

  async __cleanUserSession() {
    if (!this.userSession) {
      await UserSession.removeUserDataFromDisk();
      return;
    }

    await this.userSession.cleanUserSession();
    this.userSession = null;
  }

  resetStore() {
    this.store.dispatch({ type: RESET_STORE_ACTION_TYPE });
  }

  static getApiClient() {
    return instance && instance.apiClient && instance.apiClient;
  }

  static getUserSession() {
    return instance && instance.userSession;
  }

  static getStore() {
    return instance && instance.store;
  }
}
