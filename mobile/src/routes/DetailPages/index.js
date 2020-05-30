import React from 'react';
import { Switch } from 'react-router-dom';

import JobDetail from '../../pages/JobDetail';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <Switch>
      <PrivateRoute path="/jobs/:id" component={JobDetail} />
    </Switch>
  );
}

export default Dashboard;
