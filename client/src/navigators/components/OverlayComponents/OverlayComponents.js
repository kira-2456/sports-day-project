import React from 'react';

export default () => {
  const ToastComponent = require('molecules/ToastContainer').default;
  return [<ToastComponent key={'ToastOverlayComponent'} />];
};
