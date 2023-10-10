import { CircularProgress } from '@mui/material';

const TOAST_TYPES = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  WARNING: 'WARNING',
};

export const TOAST_CONFIGS = {
  [TOAST_TYPES.LOADING]: {
    renderLeftAccessory: () => <CircularProgress size={12} />,
  },
};

export default TOAST_TYPES;
