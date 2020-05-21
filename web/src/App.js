import React from 'react';

import UserProvider from './providers/UserProvider';

import { GlobalStyles } from './styles/global';
import Routes from './routes';

function App() {
  return (
    <UserProvider>
      <GlobalStyles />
      <Routes />
    </UserProvider>
  );
}

export default App;
