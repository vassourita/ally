import React from 'react';
import { Switch } from 'react-router-dom';

import Chat from '../../pages/Chat';
import JobDetail from '../../pages/JobDetail';
import ProposalDetail from '../../pages/ProposalDetail';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <Switch>
      <PrivateRoute path="/chat/:id" component={Chat} />
      <PrivateRoute path="/jobs/:id" component={JobDetail} />
      <PrivateRoute path="/proposals/:id" component={ProposalDetail} />
    </Switch>
  );
}

export default Dashboard;
