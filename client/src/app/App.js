import { Provider } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppController from 'core/controllers/AppController';
import { initializeUserSession } from 'core/utils/appInitializationHelpers';

import MainNavigator from 'navigators/modules/MainNavigator';

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
    <Provider store={store}>
      <Router>
        <MainNavigator />
      </Router>
    </Provider>
  );
};

export default App;
