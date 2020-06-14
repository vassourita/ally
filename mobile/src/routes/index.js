import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Account from './Account';
import Dashboard from './Dashboard';
import DetailPages from './DetailPages';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path={['/login', '/register']} component={Account} />
        <Route path="/jobs/:id" component={DetailPages} />
        <Route
          path={['/profile', '/chat', '/chat/:id', '/jobs', '/notifications', '/proposals']}
          component={Dashboard}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
