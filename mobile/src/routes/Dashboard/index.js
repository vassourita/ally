import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as socket from '../../services/socket';
import * as NotificationActions from '../../store/modules/notifications/actions';

import DashboardMain from '../../components/DashboardMain';

import Chat from '../../pages/Chat';
import Proposals from '../../pages/Proposals';
import Profile from '../../pages/Profile';
import Jobs from '../../pages/Jobs';
import Notifications from '../../pages/Notifications';

import PrivateRoute from '../PrivateRoute';

function Dashboard() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect(auth.id);
    socket.subscribeToNotifications(data => {
      if (data.notification.status === 'denied') {
        toast.error(data.notification.description);
      } else {
        toast.info(data.notification.description);
      }
      dispatch(NotificationActions.addNotification(data.notification));
    });
  }, [auth.id]);

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
