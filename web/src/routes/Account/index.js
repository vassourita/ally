import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../../pages/Login';
import Register1 from '../../pages/Register/1';
import Register2 from '../../pages/Register/2';
import Register3 from '../../pages/Register/3';

function Account() {
  return (
    <>
      <h1>Account</h1>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register/1" component={Register1} />
        <Route path="/register/2" component={Register2} />
        <Route path="/register/3" component={Register3} />
      </Switch>
    </>
  );
}

export default Account;
