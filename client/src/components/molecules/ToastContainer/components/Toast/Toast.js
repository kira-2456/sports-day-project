import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import './Toast.css';
import TOAST_TYPES, { TOAST_CONFIGS } from '../../constants/toastTypes';

const Toast = props => {
  const { toast, hideToast: hideToastFromProps } = props;

  const { message, type, position } = toast;

  const hideToast = useCallback(() => {
    hideToastFromProps({ toast });
  }, [hideToastFromProps, toast]);

  const containerStyleClass = useMemo(() => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'success';
      case TOAST_TYPES.FAILED:
        return 'failure';
      case TOAST_TYPES.WARNING:
        return 'warning';
      case TOAST_TYPES.LOADING:
        return 'loading';
    }
  }, [type]);

  const renderLeftAccessoryView = useCallback(() => {
    const { renderLeftAccessory } = TOAST_CONFIGS?.[type] || EMPTY_OBJECT;

    if (!renderLeftAccessory) {
      return null;
    }

    return <div className={'left-accessory'}>{renderLeftAccessory()}</div>;
  }, [type]);

  return (
    <div className={`toast container-${containerStyleClass}`}>
      <button onClick={hideToast} className={'crossButton'}>
        {'x'}
      </button>
      <div className={'contentContainer'}>
        {renderLeftAccessoryView()}
        <p>{message}</p>
      </div>
    </div>
  );
};

Toast.propTypes = {
  toast: PropTypes.shape({
    key: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }),

  hideToast: PropTypes.func,
};

export default Toast;
