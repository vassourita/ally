import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chat from '../../pages/Chat';
import Rating from '../../pages/Rating';
import Profile from '../../pages/Profile';
import Vacancies from '../../pages/Vacancies';
import CreateVacancy from '../../pages/CreateVacancy';
import Notifications from '../../pages/Notifications';

import DashboardMain from '../../components/DashboardMain';

function Dashboard() {
  return (
    <DashboardMain>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/rate" component={Rating} />
        <Route path="/profile" component={Profile} />
        <Route path="/vacancies" component={Vacancies} />
        <Route path="/vacancies/new" component={CreateVacancy} />
        <Route path="/notifications" component={Notifications} />
      </Switch>
    </DashboardMain>
  );
}

export default Dashboard;
