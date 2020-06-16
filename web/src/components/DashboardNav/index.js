import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiBriefcase, FiMessageSquare, FiBell } from 'react-icons/fi';

import { Container, Title, List, ListItem, PageName } from './styles';

function DashboardNav() {
  return (
    <Container>
      <Title>Menu</Title>
      <List>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/profile">
            <FiUser size="20" />
            <PageName>Perfil</PageName>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/vacancies">
            <FiBriefcase size="20" />
            <PageName>Vagas</PageName>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/chat">
            <FiMessageSquare size="20" />
            <PageName>Mensagens</PageName>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/notifications">
            <FiBell size="20" />
            <PageName>Notificações</PageName>
          </NavLink>
        </ListItem>
      </List>
    </Container>
  );
}

export default DashboardNav;
