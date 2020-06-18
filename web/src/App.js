import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from './styles/global';

import { store, persistor } from './store';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <Routes />
        <ToastContainer autoClose={4000} hideProgressBar={true} position={'top-center'} />
      </PersistGate>
    </Provider>
  );
}

export default App;
