import React from 'react';
import { FiSearch } from 'react-icons/fi';

import SelectBlock from '../../components/SelectBlock';

import { Container, Filters, List, Card } from './styles';

function Jobs() {
  return (
    <Container>
      <Filters>
        <span>
          <FiSearch />
          filtros
        </span>
        <div>
          <SelectBlock label="Local" />
          <SelectBlock label="Data" />
        </div>
      </Filters>
      <List>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </List>
    </Container>
  );
}

export default Jobs;
