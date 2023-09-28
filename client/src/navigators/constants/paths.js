import routes from './routes';

export default {
  [routes.login]: {
    path: '/login',
  },
  [routes.signup]: {
    path: '/signup',
  },

  // auth
  [routes.home]: {
    path: '/home',
  },

  [routes.notFound]: {
    path: '*',
  },
};
