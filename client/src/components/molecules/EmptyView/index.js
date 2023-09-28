import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './EmptyView.module.css';

const EmptyView = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </div>
  );
};

export default EmptyView;
