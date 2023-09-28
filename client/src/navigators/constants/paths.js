import routes from './routes';

export default {
  [routes.login]: {
    path: '/login',
  },
  [routes.signUp]: {
    path: '/signUp',
  },

  // auth
  [routes.home]: {
    path: '/home',
  },

  [routes.notFound]: {
    path: '*',
  },
};
