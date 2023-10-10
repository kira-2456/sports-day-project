import React, { useCallback } from 'react';

import { showToast } from 'molecules/ToastContainer';
import TOAST_TYPES from 'molecules/ToastContainer/constants/toastTypes';
import POSITION_TYPES from 'molecules/ToastContainer/constants/positionTypes';

import styles from './MainNavigator.module.css';

const MainNavigator = props => {
  const showSuccessToastWithTimer = useCallback(() => {
    showToast({
      message: 'Toast with timer',
      timer: 3000,
      type: TOAST_TYPES.SUCCESS,
      position: POSITION_TYPES.BOTTOM_LEFT,
    });
  }, []);

  const showFailureToastWithTimer = useCallback(() => {
    showToast({
      message: 'Toast with timer',
      // timer: 3000,
      type: TOAST_TYPES.FAILED,
      position: POSITION_TYPES.BOTTOM_RIGHT,
    });
  }, []);

  const showLoadingToastWithTimer = useCallback(() => {
    showToast({
      message: 'Toast with timer',
      // timer: 3000,
      type: TOAST_TYPES.LOADING,
      position: POSITION_TYPES.TOP_RIGHT,
    });
  }, []);

  return (
    <div className={styles.container}>
      <button onClick={showSuccessToastWithTimer}>Success Toast With Timer</button>

      <button onClick={showFailureToastWithTimer}>Failed Toast With Timer</button>

      <button onClick={showLoadingToastWithTimer}>Loading Toast With Timer</button>
    </div>
  );
};

export default MainNavigator;
