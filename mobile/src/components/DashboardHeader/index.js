import React from 'react';
import { FiBell } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/logo/icon@3x.png';

import { Container, Left, Right } from './styles';

function DashboardHeader() {
  const location = useLocation();

  function getTitle() {
    const titles = {
      jobs: 'Vagas',
      chat: 'Mensagens',
      profile: 'Perfil',
      proposals: 'Propostas',
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
        <FiBell size={30} />
      </Right>
    </Container>
  );
}

export default DashboardHeader;
