import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { formatRelative } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import * as NotificationActions from '../../store/modules/notifications/actions';
import api from '../../services/api';

import { Container, ListContainer, List, ListItem, Name, Side, Date, LinkButton } from './styles';

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/notifications');

        if (data.notifications) return dispatch(NotificationActions.setNotifications(data.notifications));
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    })();
  }, [dispatch]);

  const handleSetRead = async id => {
    try {
      const { status } = await api.put(`/notifications/${id}`);

      if (status === 200) {
        return dispatch(
          NotificationActions.updateNotification(id, {
            is_read: true,
          }),
        );
      }
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  function getNotificationDate(timestamp) {
    return formatRelative(new window.Date(timestamp), new window.Date(), { locale: pt_BR });
  }

  return (
    <Container>
      <CardBox>
        <CardHeader title="Notificações" sub="Visualize suas notificações de novas mensagens e propostas" />
      </CardBox>
      <ListContainer>
        <List>
          {!notifications.length && <h6>Não há notificações...</h6>}
          {notifications.map(notification => (
            <ListItem
              onClick={() => {
                history.push(notification.link);
                handleSetRead(notification.id);
              }}
              key={notification.id}
            >
              <Name>
                <h4>
                  {notification.title} {!notification.is_read && <FiAlertCircle size="14" color="#df8020" />}
                </h4>
                <p>{notification.description}</p>
              </Name>
              <Side>
                {!notification.is_read && (
                  <LinkButton onClick={() => handleSetRead(notification.id)}>Marcar como lido</LinkButton>
                )}
                <Date>{getNotificationDate(notification.created_at)}</Date>
              </Side>
            </ListItem>
          ))}
        </List>
      </ListContainer>
    </Container>
  );
}

export default Notifications;
