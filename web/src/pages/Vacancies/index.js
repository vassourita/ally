import React from 'react';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import { Grid, Header, Nav, List, ListItem } from './styles';

function Vacancies() {
  return (
    <Grid>
      <Header>
        <CardBox>
          <CardHeader title="Vagas" />
        </CardBox>
      </Header>
      <Nav></Nav>
      <List></List>
    </Grid>
  );
}

export default Vacancies;
