import React, { useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

import { showAlertBox, hideAlertBox } from 'molecules/AlertBox';
import useLogout from 'modules/auth/hooks/useLogout';
import to from 'core/utils/await-to';

import styles from './index.module.css';
import Routes from '../../../../constants/routes';
import RoutePaths from '../../../../constants/paths';

const Navbar = () => {
  const { loading, logout } = useLogout();
  const history = useHistory();

  const onLogout = useCallback(async () => {
    hideAlertBox();
    await to(logout());
    history.push(RoutePaths[Routes.login].path);
  }, []);

  const handleLogout = useCallback(() => {
    showAlertBox({
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      actions: [
        {
          label: 'Cancel',
          color: 'secondary',
          onPress: hideAlertBox,
        },
        {
          label: 'Logout',
          color: 'primary',
          onPress: onLogout,
        },
      ],
    });
  }, [onLogout]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className={styles.title}>
          Sports Day Events Dashboard
        </Typography>
        <div className={styles.space}></div>
        <Button color="inherit" onClick={handleLogout}>
          {loading ? 'Logging Out...' : 'Logout'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
