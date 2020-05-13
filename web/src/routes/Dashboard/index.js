import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Chat from '../../pages/Chat';
import Rating from '../../pages/Rating';
import Profile from '../../pages/Profile';
import Vacancies from '../../pages/Vacancies';
import CreateVacancy from '../../pages/CreateVacancy';
import Notifications from '../../pages/Notifications';

import DashboardMain from '../../components/DashboardMain';

import { isAuthenticated } from '../../services/auth';

function Dashboard() {
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <DashboardMain>
      <Route
        render={({ location }) => (
          <>
            <TransitionGroup>
              <CSSTransition timeout={400} classNames="fade-roll" key={location.key}>
                <Switch location={location}>
                  <Route path="/chat" component={Chat} />
                  <Route path="/rate" component={Rating} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/vacancies" component={Vacancies} />
                  <Route path="/vacancies/new" component={CreateVacancy} />
                  <Route path="/notifications" component={Notifications} />
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
