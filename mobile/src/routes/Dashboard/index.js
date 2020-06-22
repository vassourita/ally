import React from 'react';
import { Switch } from 'react-router-dom';

import DashboardMain from '../../components/DashboardMain';

import Jobs from '../../pages/Jobs';
import Profile from '../../pages/Profile';
import ChatList from '../../pages/ChatList';
import Proposals from '../../pages/Proposals';
import Notifications from '../../pages/Notifications';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <DashboardMain>
      <Switch>
        <PrivateRoute exact path="/jobs" component={Jobs} />
        <PrivateRoute exact path="/chat" component={ChatList} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/proposals" component={Proposals} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
      </Switch>
    </DashboardMain>
  );
}

export default Dashboard;
