import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import { store } from "./store";
import { getIsDemoMode, getIsDevMode } from './utils/config';
import { initializeApp } from './utils/demoUtils';

function App() {
  if (getIsDemoMode()) {
    initializeApp();
  }
  if (getIsDevMode()) {
    return (
      <StrictMode>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </StrictMode>
    );
  }

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
