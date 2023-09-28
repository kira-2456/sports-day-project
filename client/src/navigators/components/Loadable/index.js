import Loadable from 'react-loadable';
import { CircularProgress } from '@mui/material';

export default ({ loader, LoadingPlaceholder = CircularProgress }) =>
  Loadable({
    loader: loader,
    loading: props => <LoadingPlaceholder />,
  });
