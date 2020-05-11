import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AccountAside from '../../components/AccountAside';
import AccountMain from '../../components/AccountMain';

import Login from '../../pages/Login';
import Register1 from '../../pages/Register/1';
import Register2 from '../../pages/Register/2';
import Register3 from '../../pages/Register/3';

import { Container } from './styles';

function Account() {
  return (
    <Container>
      <AccountAside />
      <AccountMain>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register/1" component={Register1} />
          <Route path="/register/2" component={Register2} />
          <Route path="/register/3" component={Register3} />
        </Switch>
      </AccountMain>
    </Container>
  );
}

export default Account;
