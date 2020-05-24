import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import api from '../../services/api';

import { Container, ListContainer, List, ListItem, Name, Side, Date, LinkButton } from './styles';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/notifications');

        if (data.notifications) return setNotifications(data.notifications);
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    })();
  }, []);

  const handleSetRead = async id => {
    try {
      const { data } = await api.put(`/notifications/${id}`);

      if (data.updated) {
        const index = notifications.findIndex(j => j.id === id);
        const updatedNotifications = [...notifications];
        updatedNotifications[index] = {
          ...updatedNotifications[index],
          is_read: true,
        };
        return setNotifications(updatedNotifications);
      }
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  return (
    <Container>
      <CardBox>
        <CardHeader title="Notificações" sub="Visualize suas notificações de novas mensagens e propostas" />
      </CardBox>
      <ListContainer>
        <List>
          {!notifications.length && <h6>Não há notificações...</h6>}
          {notifications.map(notification => (
            <ListItem key={notification.id}>
              <Name>
                <h4>
                  {notification.type.name} {!notification.is_read && <FiAlertCircle size="14" color="#df8020" />}
                </h4>
                <p>{notification.description}</p>
              </Name>
              <Side>
                <Link to={notification.link}>Ver</Link>
                {!notification.is_read && (
                  <>
                    - <LinkButton onClick={() => handleSetRead(notification.id)}>Marcar como lido</LinkButton>
                  </>
                )}
                <Date>{notification.date}</Date>
              </Side>
            </ListItem>
          ))}
        </List>
      </ListContainer>
    </Container>
  );
}

export default Notifications;
