import React from 'react';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';

import styles from './index.module.css';

const FormErrors = ({ errors }) => {
  if (_isEmpty(errors)) {
    return null;
  }

  return _map(errors, error => <p className={styles.errorText}>{error?.message}</p>);
};

export default React.memo(FormErrors);
