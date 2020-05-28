import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import DashboardMain from '../../components/DashboardMain';

import Chat from '../../pages/Chat';
import User from '../../pages/User';
import Rating from '../../pages/Rating';
import Profile from '../../pages/Profile';
import Jobs from '../../pages/Jobs';
import Notifications from '../../pages/Notifications';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <DashboardMain>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition timeout={400} classNames="fade-roll" key={location.key}>
              <Switch location={location}>
                <PrivateRoute path="/chat/:id" component={Chat} />
                <PrivateRoute exact path="/chat" component={Chat} />
                <PrivateRoute path="/jobs/:id" component={Jobs} />
                <PrivateRoute exact path="/jobs" component={Jobs} />
                <PrivateRoute path="/rate" component={Rating} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute path="/notifications" component={Notifications} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </DashboardMain>
  );
}

export default Dashboard;
