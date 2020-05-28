import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Chat from '../../pages/Chat';
import User from '../../pages/User';
import Rating from '../../pages/Rating';
import Profile from '../../pages/Profile';
import Jobs from '../../pages/Jobs';
import Notifications from '../../pages/Notifications';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition timeout={400} classNames="fade-roll" key={location.key}>
            <Switch location={location}>
              <PrivateRoute path="/chat" component={Chat} />
              <PrivateRoute path="/rate" component={Rating} />
              <PrivateRoute path="/users/:id" component={User} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/jobs" component={Jobs} />
              <PrivateRoute path="/jobs/:id" component={Jobs} />
              <PrivateRoute path="/notifications" component={Notifications} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default Dashboard;
