import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import iconImg from '../../assets/logo/icon50.png';

import { Container, Head, List, ListItem, Greeting } from './styles';

function DashboardHeader() {
  const [user] = useState({
    name: 'Anônimo',
    image_url:
      'https://images.unsplash.com/photo-1580925594670-117567b46f26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
  });

  function getGreetingBasedOnTime() {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Bom dia';
    }
    if (hours > 12 && hours < 18) {
      return 'Boa tarde';
    }
    if (hours > 18) {
      return 'Boa noite';
    }
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
          <strong>{user?.name}</strong>
        </p>
        <img src={user?.image_url} alt="" className="imgUser" />
      </Greeting>
    </Container>
  );
}

export default DashboardHeader;
