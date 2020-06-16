import React from 'react';
import { Switch } from 'react-router-dom';

import DashboardMain from '../../components/DashboardMain';

import Chat from '../../pages/Chat';
import Proposals from '../../pages/Proposals';
import Profile from '../../pages/Profile';
import Jobs from '../../pages/Jobs';
import Notifications from '../../pages/Notifications';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <DashboardMain>
      <Switch>
        <PrivateRoute path="/chat/:id" component={Chat} />
        <PrivateRoute exact path="/chat" component={Chat} />
        <PrivateRoute exact path="/jobs" component={Jobs} />
        <PrivateRoute exact path="/proposals" component={Proposals} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
      </Switch>
    </DashboardMain>
  );
}

export default Dashboard;
