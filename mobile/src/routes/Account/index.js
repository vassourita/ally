import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AccountMain from '../../components/AccountMain';

import Login from '../../pages/Login';
import Register from '../../pages/Register';

function Account() {
  return (
    <AccountMain>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </AccountMain>
  );
}

export default Account;
