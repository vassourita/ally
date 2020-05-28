import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Account from './Account';
import Dashboard from './Dashboard';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path={['/login', '/register']} component={Account} />
        <Route path={['/profile', '/chat', '/chat/:id', '/jobs', 'jobs/:id', '/notifications', '/rate']} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
