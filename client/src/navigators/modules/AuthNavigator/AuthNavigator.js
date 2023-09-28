import React from 'react';
import _map from 'lodash/map';
import _values from 'lodash/values';
import { Route, Switch, Redirect } from 'react-router-dom';

import Routes from '../../constants/routes';
import RoutePaths from '../../constants/paths';
import authRoutes from './routes/authRoutes';

const FallbackScene = () => (
  <Route
    key={Routes.notFound}
    component={() => {
      return <Redirect to={RoutePaths[Routes.home].path} />;
    }}
    {...RoutePaths[Routes.notFound]}
  />
);

const AuthNavigator = () => {
  return (
    <>
      <Switch>
        {_map(_values(authRoutes), route => {
          const { key, routeConfig } = route;
          return <Route key={key} {...routeConfig} />;
        })}
        <FallbackScene />
      </Switch>
    </>
  );
};

export default AuthNavigator;
