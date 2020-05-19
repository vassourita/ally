import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Chat from '../../pages/Chat';
import User from '../../pages/User';
import Rating from '../../pages/Rating';
import Profile from '../../pages/Profile';
import Vacancies from '../../pages/Vacancies';
import CreateVacancy from '../../pages/CreateVacancy';
import Notifications from '../../pages/Notifications';

import DashboardMain from '../../components/DashboardMain';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <DashboardMain>
      <Route
        render={({ location }) => (
          <>
            <TransitionGroup>
              <CSSTransition timeout={400} classNames="fade-roll" key={location.key}>
                <Switch location={location}>
                  <PrivateRoute path="/chat" component={Chat} />
                  <PrivateRoute path="/rate" component={Rating} />
                  <PrivateRoute path="/users/:id" component={User} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/vacancies" component={Vacancies} />
                  <PrivateRoute path="/vacancies/:id" component={Vacancies} />
                  <PrivateRoute path="/vacancies/new" component={CreateVacancy} />
                  <PrivateRoute path="/notifications" component={Notifications} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </>
        )}
      />
    </DashboardMain>
  );
}

export default Dashboard;
