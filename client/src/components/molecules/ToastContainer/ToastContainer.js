import React, { useCallback, useState, useImperativeHandle, useMemo } from 'react';
import _map from 'lodash/map';
import _keys from 'lodash/keys';
import _groupBy from 'lodash/groupBy';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import _values from 'lodash/values';
import _isEmpty from 'lodash/isEmpty';
import _reverse from 'lodash/reverse';
import _isNumber from 'lodash/isNumber';
import _uniqueId from 'lodash/uniqueId';

import './ToastContainer.css';
import Toast from './components/Toast';
import TOAST_TYPES from './constants/toastTypes';
import POSITION_TYPES, { POSITION_TYPES_VS_CSS_CLASS } from './constants/positionTypes';

const toastRef = React.createRef();

const POSITION = 'bottom-right';

const getNewToast = ({ message, type, position }) => ({
  key: _uniqueId(),
  message,
  type,
  position,
});

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const hideToast = useCallback(({ toast }) => {
    setToasts(prevToasts => _filter(prevToasts, item => item.key !== toast.key));
  }, []);

  const showToast = useCallback(
    async ({ message, type, position, timer } = EMPTY_OBJECT) => {
      if (!_values(TOAST_TYPES).includes(type)) {
        console.warn('[TOAST] : invalid toastType');
        return;
      }

      if (!_keys(POSITION_TYPES).includes(position)) {
        console.warn('[TOAST] : invalid positionType');
        return;
      }

      const newToast = getNewToast({ message, type, position });

      setToasts(prevToasts => [...prevToasts, newToast]);

      if (_isNumber(timer)) {
        setTimeout(() => {
          hideToast({ toast: newToast });
        }, timer);
      }

      return newToast;
    },
    [hideToast]
  );

  const positionVsToasts = useMemo(() => {
    const positionVsToasts = _groupBy(toasts, 'position');

    return _reduce(
      positionVsToasts,
      (acc, toastsForPosition, positionType) => {
        if (positionType.includes('bottom')) {
          return {
            ...acc,
            [positionType]: _reverse(toastsForPosition),
          };
        }

        return {
          ...acc,
          [positionType]: toastsForPosition,
        };
      },
      {}
    );
  }, [toasts]);

  useImperativeHandle(toastRef, () => ({
    showToast,
    hideToast,
  }));

  return (
    <div className={`container`}>
      {_map(_keys(POSITION_TYPES_VS_CSS_CLASS), positionType => {
        const positionClassName = POSITION_TYPES_VS_CSS_CLASS[positionType];

        const toastsForPosition = positionVsToasts[positionType] || EMPTY_ARRAY;

        if (_isEmpty(toastsForPosition)) {
          return null;
        }

        return (
          <div className={`sectionContainer container-${positionClassName}`}>
            {_map(toastsForPosition, toast => (
              <Toast key={toast.key} toast={toast} hideToast={hideToast} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

//

export const showToast = (...args) => toastRef.current?.showToast(...args);
export const hideToast = (...args) => toastRef.current?.hideToast(...args);

export default ToastContainer;
