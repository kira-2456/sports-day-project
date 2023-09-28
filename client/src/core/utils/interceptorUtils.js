import _map from 'lodash/map';
import _get from 'lodash/get';
import _identity from 'lodash/identity';
import _throttle from 'lodash/throttle';

import AppController from 'core/controllers/AppController';

const UNAUTHORISED_USER_DEBOUNCE_INTERVAL = 5000;
const UNAUTHORISED_STATUS_CODES = new Set([401, 403]);

const getErrorMessages = () => ({
  INVALID_TOKEN: {
    title: 'Session Timeout',
    description: 'Your session has expired. Please login again.',
  },
});

const handleUnauthorisedUser = _throttle(
  async ({ alertMessage, isAccessRevoked } = EMPTY_OBJECT) => {
    if (alertMessage) {
      alert(alertMessage);
    }

    await AppController.getInstance().onUserLogout();
  },
  UNAUTHORISED_USER_DEBOUNCE_INTERVAL,
  { trailing: false }
);

export const unauthorizedRequestInterceptor = {
  onSuccess: _identity,
  onFailure: error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (UNAUTHORISED_STATUS_CODES.has(error.response.status)) {
      const isInvalidToken = _get(error, ['response', 'data', 'message']) === 'INVALID_TOKEN';

      if (isInvalidToken) {
        handleUnauthorisedUser({ alertMessage: getErrorMessages().INVALID_TOKEN });
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
};

export const intercept = (response, interceptors) => {
  _map(interceptors, interceptor => interceptor(response));
};
