import React from 'react';
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './contexts/UserContext';

import { GlobalStyles } from './styles/global';
import Routes from './routes';

function App() {
  return (
    <UserProvider>
      <GlobalStyles />
      <Routes />
      <ToastContainer autoClose={4000} hideProgressBar={true} position={'top-center'} />
    </UserProvider>
  );
}

export default App;
