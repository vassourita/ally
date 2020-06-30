import React, { useEffect, useCallback } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatRelative } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

import * as NotificationActions from '../../store/modules/notifications/actions';
import api from '../../services/api';

import { Container, List, ListItem, Name, Side, Date as DateContainer, NoNotifications } from './styles';

function Notifications() {
  const notifications = useSelector(state => state.notifications);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get('/notifications')
      .then(response => {
        if (response.data.notifications) {
          dispatch(NotificationActions.setNotifications(response.data.notifications));
        } else {
          dispatch(NotificationActions.setNotifications([]));
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      })
      .catch(() => {
        dispatch(NotificationActions.setNotifications([]));
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      });
  }, [dispatch]);

  const handleSetRead = useCallback(
    async (id, link) => {
      if (link) {
        history.push(link);
      }
      try {
        const response = await api.put(`/notifications/${id}`);

        if (response.status === 200) {
          return dispatch(
            NotificationActions.updateNotification(id, {
              is_read: true,
            })
          );
        }
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    },
    [dispatch, history]
  );

  const getNotificationDate = timestamp => {
    return formatRelative(new Date(timestamp), new Date(), { locale: pt_BR });
  };

  const handleReadAll = useCallback(() => {
    notifications.filter(n => !n.is_read).forEach(n => handleSetRead(n.id, null));
  }, [handleSetRead, notifications]);

  useEffect(() => {
    return handleReadAll;
  }, [handleReadAll]);

  return (
    <Container>
      <List>
        {!notifications.length && <NoNotifications>Nenhuma notificação</NoNotifications>}
        {notifications.map(notification => (
          <ListItem onClick={() => handleSetRead(notification.id, notification.link)} key={notification.id}>
            <Name>
              <h4>
                {notification.title} {!notification.is_read && <FiAlertCircle size="14" color="#df8020" />}
              </h4>
              <p>{notification.description}</p>
            </Name>
            <Side>
              <DateContainer>{getNotificationDate(notification.created_at)}</DateContainer>
            </Side>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Notifications;
