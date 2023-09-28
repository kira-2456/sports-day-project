import Routes from '../../../constants/routes';
import RoutePaths from '../../../constants/paths';
import Loadable from '../../../components/Loadable';

export default {
  [Routes.login]: {
    key: Routes.login,
    routeConfig: {
      component: Loadable({ loader: () => import('modules/auth/pages/Login') }),
      ...RoutePaths[Routes.login],
      exact: true,
    },
  },
  [Routes.signUp]: {
    key: Routes.signUp,
    routeConfig: {
      component: Loadable({ loader: () => import('modules/auth/pages/SignUp') }),
      ...RoutePaths[Routes.signUp],
      exact: true,
    },
  },
};
