import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiUser, FiBriefcase, FiMessageSquare, FiBell, FiLogOut } from 'react-icons/fi';

import * as AuthActions from '../../store/modules/auth/actions';

import { Container, Title, List, ListItem, PageName, Logoff } from './styles';

function DashboardNav() {
  const dispatch = useDispatch();

  async function handleLogoff() {
    dispatch(AuthActions.logoff());
  }

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
      <Logoff onClick={handleLogoff}>
        <FiLogOut /> Sair
      </Logoff>
    </Container>
  );
}

export default DashboardNav;
