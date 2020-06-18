import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Account from './Account';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/', '/about', '/contact']} component={Home} />
        <Route path={['/login', '/register']} component={Account} />
        <PrivateRoute
          path={['/profile', '/chat', '/vacancies', 'vacancies/:id', '/notifications', '/users']}
          component={Dashboard}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
