import Loadable from 'react-loadable';

import LoadingPlaceholder from 'molecules/LoadingPlaceholder';

export default ({ loader, LoadingPlaceholderComponent = LoadingPlaceholder }) =>
  Loadable({
    loader: loader,
    loading: props => <LoadingPlaceholderComponent {...props} />,
  });
