import React from 'react';

import Logo from '../assets/logo@3x.png'

import { Container, Header } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <img src={Logo} />
      </Header>
    </Container>
  );
}

export default Dashboard;