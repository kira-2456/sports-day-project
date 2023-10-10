import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';

import theme from 'styles/theme';

import MainNavigator from 'navigators/modules/MainNavigator';
import OverlayComponents from 'navigators/components/OverlayComponents';

import styles from './App.module.css';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <MainNavigator />
        <OverlayComponents />
      </div>
    </ThemeProvider>
  );
};

export default App;
