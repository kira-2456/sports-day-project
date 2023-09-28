import React from 'react';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';

import styles from './index.module.css';

const FormErrors = ({ errors }) => {
  if (_isEmpty(errors)) {
    return null;
  }

  return (
    <div className={styles.container}>
      {_map(errors, error => (
        <p className={styles.errorText}>{error?.message}</p>
      ))}
    </div>
  );
};

export default React.memo(FormErrors);
