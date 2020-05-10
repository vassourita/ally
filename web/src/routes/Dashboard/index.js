import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chat from '../../pages/Chat';
import Rating from '../../pages/Rating';
import Profile from '../../pages/Profile';
import Vacancies from '../../pages/Vacancies';
import CreateVacancy from '../../pages/CreateVacancy';
import Notifications from '../../pages/Notifications';

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/rate" component={Rating} />
        <Route path="/profile" component={Profile} />
        <Route path="/vacancies" component={Vacancies} />
        <Route path="/vacancies/new" component={CreateVacancy} />
        <Route path="/notifications" component={Notifications} />
      </Switch>
    </>
  );
}

export default Dashboard;
