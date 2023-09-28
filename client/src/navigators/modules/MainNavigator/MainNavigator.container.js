import _get from 'lodash/get';
import { connect } from 'react-redux';

import MainNavigator from './MainNavigator';
import { appRouterStateKey } from '../../ducks/appRouter';

const mapStateToProps = state => ({
  routerType: _get(state, [...appRouterStateKey, 'routerType']),
});

export default connect(mapStateToProps)(MainNavigator);
