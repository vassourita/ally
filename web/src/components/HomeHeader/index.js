import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import logo from '../../assets/logo/logowhite.png';
import Button from '../../components/Button';

import { Container, Navbar } from './styles';

function HomeHeader() {
  const history = useHistory();
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Ally" />
      </Link>

      <Navbar>
        <ul>
          <li>
            <NavLink activeClassName="active-link" to="/about">
              SOBRE NÓS
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active-link" to="/contact">
              CONTATO
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active-link" to="/login">
              ENTRAR
            </NavLink>
          </li>
          <li>
            <Button onClick={() => history.push('/register')}>CRIAR CONTA</Button>
          </li>
        </ul>
      </Navbar>
    </Container>
  );
}

export default HomeHeader;
