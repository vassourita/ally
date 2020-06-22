import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as sw from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import './styles/fonts.css';
import './styles/animations.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

sw.register();
