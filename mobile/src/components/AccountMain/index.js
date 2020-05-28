import React from 'react';

import logoImg from '../../assets/logo/logo@3x.png';

import { Container, Logo, Outlet } from './styles';

function AccountMain({ children }) {
  return (
    <Container>
      <div>
        <Logo>
          <img src={logoImg} alt="ally logo" />
          <h3>empregador</h3>
        </Logo>
        <Outlet>{children}</Outlet>
      </div>
    </Container>
  );
}

export default AccountMain;
