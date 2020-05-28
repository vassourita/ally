import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './store';

import { GlobalStyles } from './styles/global';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Routes />
      <ToastContainer autoClose={4000} hideProgressBar={true} position={'top-center'} />
    </Provider>
  );
}

export default App;
