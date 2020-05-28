import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as sw from './serviceWorker';

import './styles/fonts.css';
import './styles/animations.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

sw.register();
