import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast } from 'react-toastify';

import * as socket from '../../services/socket';
import * as NotificationActions from '../../store/modules/notifications/actions';

import Chat from '../../pages/Chat';
import User from '../../pages/User';
import Profile from '../../pages/Profile';
import Vacancies from '../../pages/Vacancies';
import CreateVacancy from '../../pages/CreateVacancy';
import Notifications from '../../pages/Notifications';

import DashboardMain from '../../components/DashboardMain';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect(auth.id);
    socket.subscribeToNotifications(data => {
      toast.info(data.notification.description);
      dispatch(NotificationActions.addNotification(data.notification));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.id]);

  return (
    <DashboardMain>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition timeout={400} classNames="fade-roll" key={location.key}>
              <Switch location={location}>
                <PrivateRoute path="/chat" component={Chat} />
                <PrivateRoute path="/users/:id" component={User} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/vacancies" component={Vacancies} />
                <PrivateRoute exact path="/vacancies/new" component={CreateVacancy} />
                <PrivateRoute path="/vacancies/:id" component={Vacancies} />
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
