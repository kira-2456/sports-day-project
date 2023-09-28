import Routes from '../../../constants/routes';
import RoutePaths from '../../../constants/paths';
import Loadable from '../../../components/Loadable';

export default {
  [Routes.home]: {
    key: Routes.home,
    routeConfig: {
      component: Loadable({ loader: () => import('modules/home/pages/Dashboard') }),
      ...RoutePaths[Routes.home],
      exact: true,
    },
  },
};
