import React from 'react';
import { FiBell } from 'react-icons/fi';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo/icon@3x.png';

import { Container, Left, Right, Point } from './styles';

function DashboardHeader() {
  const location = useLocation();
  const history = useHistory();
  const unreadNotifications = useSelector(state => state.notifications.filter(n => !n.is_read).length);

  function getTitle() {
    const titles = {
      jobs: 'Vagas',
      chat: 'Mensagens',
      profile: 'Perfil',
      proposals: 'Propostas',
      notifications: 'Notificações',
    };
    const title = location.pathname.replace(/\//g, '');
    return titles[title] || '404';
  }

  return (
    <Container>
      <Left>
        <img src={logo} alt="ally" />
        <h1>{getTitle()}</h1>
      </Left>
      <Right>
        <FiBell
          color={location.pathname.replace(/\//g, '') === 'notifications' ? 'var(--ally-red)' : '#111'}
          onClick={() => history.push('/notifications')}
          size={25}
        />
        {unreadNotifications ? <Point></Point> : ''}
      </Right>
    </Container>
  );
}

export default DashboardHeader;
