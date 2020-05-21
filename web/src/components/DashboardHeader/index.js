import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import iconImg from '../../assets/logo/icon50.png';

import { UserContext } from '../../providers/UserProvider';

import { Container, Head, List, ListItem, Greeting } from './styles';

function DashboardHeader() {
  const { user } = useContext(UserContext);

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
        <img src={user.image_url ? `${process.env.REACT_APP_FILES_URL}${user.image_url}` : null} alt="" className="imgUser" />
      </Greeting>
    </Container>
  );
}

export default DashboardHeader;
