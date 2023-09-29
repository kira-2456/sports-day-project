import AppController from 'core/controllers/AppController';
import { waitTime } from '../../../core/utils/general';

const fetchCurrentUser = () => {
  return AppController.getApiClient().get('/api/users/');
};

const login = async ({ emailId }) => {
  await waitTime(2000);

  const response = await AppController.getApiClient().post('/email-auth/login/', { emailId });

  return response;
};

const logout = async () => {
  await waitTime(2000);
  const response = await AppController.getApiClient().get('/email-auth/logout/');
  return response;
};

const signUp = async ({ emailId, firstName, lastName }) => {
  await waitTime(2000);
  const response = await AppController.getApiClient().post('/email-auth/sign-up/', { emailId, firstName, lastName });

  return response;
};

export default {
  login,
  logout,
  signUp,

  fetchCurrentUser,
};
