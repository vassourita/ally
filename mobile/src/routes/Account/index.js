import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../../pages/Login';
import Register from '../../pages/Register';

function Account() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}

export default Account;
