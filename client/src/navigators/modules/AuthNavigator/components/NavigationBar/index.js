import React, { useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import userReader from 'core/readers/userReader';
import { showAlertBox, hideAlertBox } from 'molecules/AlertBox';
import useLogout from 'modules/auth/hooks/useLogout';
import useAuthUser from 'modules/auth/hooks/useAuthUser';
import to from 'core/utils/await-to';
import RoutePaths from 'navigators/constants/paths';
import Routes from 'navigators/constants/routes';

import styles from './index.module.css';

const Navbar = () => {
  const { user } = useAuthUser();
  const { loading, logout } = useLogout();

  const onLogout = useCallback(async () => {
    hideAlertBox();
    await to(logout());
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
    <AppBar position="sticky" className={styles.bar}>
      <Toolbar>
        <Typography variant="h6" component={Link} to={RoutePaths[Routes.home].path} className={styles.title}>
          Sports Day Events Dashboard
        </Typography>
        <div className={styles.space}></div>
        <div className={styles.userContainer}>
          <Typography variant="p" className={styles.user}>
            {userReader.fullName(user)}
          </Typography>
        </div>
        <Button color="inherit" onClick={handleLogout}>
          {loading ? 'Logging Out...' : 'Logout'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
