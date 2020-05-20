import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiBriefcase, FiMessageSquare, FiBell, FiStar } from 'react-icons/fi';

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
          <NavLink activeClassName="nav-link-active" to="/vacancies/all">
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
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/rate">
            <FiStar size="20" />
            <PageName>Avaliar</PageName>
          </NavLink>
        </ListItem>
      </List>
    </Container>
  );
}

export default DashboardNav;
