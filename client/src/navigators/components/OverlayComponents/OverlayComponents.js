import React from 'react';

export default () => {
  const AlertComponent = require('molecules/Toast').default;
  return [<AlertComponent key={'AlertOverlayComponent'} />];
};
