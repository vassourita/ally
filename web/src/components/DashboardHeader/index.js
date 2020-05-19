import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import iconImg from '../../assets/logo/icon50.png';

import api from '../../services/api';
import { getUserId } from '../../services/auth';

import { Container, Head, List, ListItem, Greeting } from './styles';

function DashboardHeader() {
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await api.get(`/profiles/${getUserId()}`);

        if (status === 200) return setUser(data.user);
        history.push('/login');
      } catch {
        history.push('/login');
      }
    })();
    // eslint-disable-next-line
  }, []);

  function getGreetingBasedOnTime() {
    const hours = new Date().getHours();
    if (hours <= 12) {
      return 'Bom dia';
    }
    if (hours <= 18) {
      return 'Boa tarde';
    }
    return 'Boa noite';
  }

  return (
    <Container>
      <Head>
        <img src={iconImg} alt="allyIcon" />
        <List>
          <ListItem>
            <Link to="https://google.com">Ajuda</Link>
          </ListItem>
          <ListItem>
            <Link to="/">Retornar ao site</Link>
          </ListItem>
        </List>
      </Head>
      <Greeting>
        <p>
          {getGreetingBasedOnTime()}, <br />
          <strong>{user.name}</strong>
        </p>
        <img
          src={user.image_url ? `${process.env.REACT_APP_FILES_URL}${user.image_url}` : null}
          alt=""
          className="imgUser"
        />
      </Greeting>
    </Container>
  );
}

export default DashboardHeader;
