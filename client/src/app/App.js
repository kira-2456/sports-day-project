import { Provider } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from 'styles/theme';
import AppController from 'core/controllers/AppController';
import { initializeUserSession } from 'core/utils/appInitializationHelpers';

import MainNavigator from 'navigators/modules/MainNavigator';
import OverlayComponents from 'navigators/components/OverlayComponents';

import styles from './App.module.css';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const initializeApp = useCallback(async () => {
    AppController.initialize();

    await initializeUserSession();
    setIsReady(true);
  }, []);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isReady) {
    return null;
  }

  const store = AppController.getInstance().getStore();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className={styles.container}>
            <MainNavigator />
          </div>
        </Router>
        <OverlayComponents />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
