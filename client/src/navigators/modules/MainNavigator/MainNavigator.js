import React from 'react';
import PropTypes from 'prop-types';

import AuthNavigator from '../AuthNavigator';
import UnAuthNavigator from '../UnAuthNavigator';
import { ROUTER_TYPES } from '../../constants/routerConstants';

class MainNavigator extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.routerType !== nextProps.routerType;
  }

  render() {
    return this.getScenes();
  }

  getScenes = () => {
    const { routerType } = this.props;
    switch (routerType) {
      case ROUTER_TYPES.AUTHORIZED: {
        return <AuthNavigator />;
      }
      case ROUTER_TYPES.UNAUTHORIZED: {
        return <UnAuthNavigator />;
      }
      default:
        return null;
    }
  };
}

MainNavigator.propTypes = {
  routerType: PropTypes.oneOf([ROUTER_TYPES.AUTHORIZED, ROUTER_TYPES.UNAUTHORIZED]),
};

export default MainNavigator;
