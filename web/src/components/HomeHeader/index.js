import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo/logowhite.png';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, Navbar } from './styles';

function HomeHeader() {
  const { user, auth } = useSelector(state => ({
    user: state.user,
    auth: state.auth,
  }));

  const [validSession, setValidSession] = useState(false);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!(user.id === auth.id && auth.token)) {
        return setValidSession(false);
      }

      const response = await api.get(`/employers/${user.id}`);

      if (!response.data.user) {
        return setValidSession(false);
      }

      if (response.data.user.id !== auth.id) {
        return setValidSession(false);
      }

      setValidSession(true);
    })();
  }, [user, auth]);

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
          {validSession ? (
            <>
              <li>
                <NavLink activeClassName="active-link" to="/login">
                  LOGIN
                </NavLink>
              </li>
              <li>
                <Button onClick={() => history.push('/profile')}>DASHBOARD</Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink activeClassName="active-link" to="/login">
                  LOGIN
                </NavLink>
              </li>
              <li>
                <Button onClick={() => history.push('/register')}>CRIAR CONTA</Button>
              </li>
            </>
          )}
        </ul>
      </Navbar>
    </Container>
  );
}

export default HomeHeader;
