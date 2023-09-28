import Loadable from 'react-loadable';

export default ({ loader, LoadingPlaceholder }) =>
  Loadable({
    loader: loader,
    loading: props => <LoadingPlaceholder {...props} />,
  });
