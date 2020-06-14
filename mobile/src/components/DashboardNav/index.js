import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiBriefcase, FiMessageSquare, FiFileText } from 'react-icons/fi';

import { Container, List, ListItem, PageName } from './styles';

function DashboardNav() {
  return (
    <Container>
      <List>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/jobs">
            <FiBriefcase size="20" />
            <PageName>Vagas</PageName>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/chat">
            <FiMessageSquare size="20" />
            <PageName>Chat</PageName>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/profile">
            <FiUser size="20" />
            <PageName>Perfil</PageName>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink activeClassName="nav-link-active" to="/proposals">
            <FiFileText size="20" />
            <PageName>Propostas</PageName>
          </NavLink>
        </ListItem>
      </List>
    </Container>
  );
}

export default DashboardNav;
