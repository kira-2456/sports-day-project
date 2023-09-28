import React from 'react';
import _map from 'lodash/map';
import _values from 'lodash/values';
import { Route, Switch, Redirect } from 'react-router-dom';

import Routes from '../../constants/routes';
import RoutePaths from '../../constants/paths';
import loginRoutes from './routes/loginRoutes';

const FallbackScene = () => (
  <Route
    key={Routes.notFound}
    component={() => {
      return <Redirect to={RoutePaths[Routes.login].path} />;
    }}
    {...RoutePaths[Routes.notFound]}
  />
);

const UnAuthNavigator = () => {
  return (
    <>
      <Switch>
        {_map(_values(loginRoutes), route => {
          const { key, routeConfig } = route;
          return <Route key={key} {...routeConfig} />;
        })}
        <FallbackScene />
      </Switch>
    </>
  );
};

export default UnAuthNavigator;
