import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AccountMain from '../../components/AccountMain';

import Login from '../../pages/Login';
import Register from '../../pages/Register';

import { Container } from './styles';

function Account() {
  return (
    <Container>
      <AccountMain>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </AccountMain>
    </Container>
  );
}

export default Account;
