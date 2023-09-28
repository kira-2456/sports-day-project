import AppController from 'core/controllers/AppController';

const fetchCurrentUser = () => {
  return AppController.getApiClient().get('/api/users/');
};

const login = ({ emailId }) => {
  return AppController.getApiClient().post('/email-auth/login/', { emailId });
};

const logout = () => {
  return AppController.getApiClient().get('/email-auth/logout/');
};

const signUp = ({ emailId, firstName, lastName }) => {
  return AppController.getApiClient().post('/email-auth/sign-up/', { emailId, firstName, lastName });
};

export default {
  login,
  logout,
  signUp,

  fetchCurrentUser,
};
