import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import Img from '../../assets/background/dash-2.png';

import {
  Container,
  Header,
  Nav,
  NavList,
  NavItem,
  Badge,
  Title,
  Available,
  List,
  ListItem,
  UserImg,
  UserName,
  UserInfo,
} from './styles';

function Vacancies() {
  return (
    <Container>
      <Nav>
        <CardHeader title="Suas vagas" sub="Visualize as vagas que você criou e as suas propostas" />
        <NavList>
          <NavItem>
            <NavLink activeClassName="nav-link-active" to="/vacancies/1">
              <div>
                <Title>Vaga para Entregador</Title>
                <Available>3 vagas disponíveis</Available>
              </div>
              <Badge>2</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="nav-link-active" to="/vacancies/2">
              <div>
                <Title>Vaga para Garçom</Title>
                <Available>1 vaga disponível</Available>
              </div>
              <Badge>3</Badge>
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
      <Header>
        <CardBox>
          <CardHeader title="Propostas" sub="Visualize as propostas recebidas em sua Vaga para Entregador" />
        </CardBox>
      </Header>
      <List>
        <ListItem>
          <UserImg src={Img} alt="" />
          <UserName>
            <h3>Daniel Airton</h3>
            <Link to="/profile">Clique para ver o perfil</Link>
          </UserName>
          <UserInfo></UserInfo>
        </ListItem>
        <ListItem>
          <UserImg src={Img} alt="" />
          <UserName>
            <h3>Daniel Airton</h3>
            <Link to="/profile">Clique para ver o perfil</Link>
          </UserName>
          <UserInfo></UserInfo>
        </ListItem>
      </List>
    </Container>
  );
}

export default Vacancies;
