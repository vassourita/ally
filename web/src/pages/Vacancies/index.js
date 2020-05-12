import React from 'react';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import { Grid, Header, Nav, List, ListItem, UserInfo } from './styles';
import { Link } from 'react-router-dom';

function Vacancies() {
  return (
    <Grid>
      <Nav>
        <CardHeader title="Vagas" sub="Visualize as vagas que você criou e as suas propostas" />
      </Nav>
      <Header>
        <CardBox>
          <CardHeader title="Propostas" sub="Visualize as propostas recebidas em sua Vaga para Entregador" />
        </CardBox>
      </Header>
      <List>
        <ListItem>
          <UserInfo>
            <img src="https://images.unsplash.com/photo-1587994344997-f78753c899d5?w=600" alt="" />
            <h3>Daniel Airton</h3>
            <Link to="/profile">Clique para ver o perfil</Link>
          </UserInfo>
        </ListItem>
      </List>
    </Grid>
  );
}

export default Vacancies;
