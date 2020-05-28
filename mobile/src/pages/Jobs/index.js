import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch, FiChevronRight } from 'react-icons/fi';

import SelectBlock from '../../components/SelectBlock';

import { Container, Filters, List, Card, Image, Info, Bottom } from './styles';

const dateOptions = [
  { label: 'Qualquer', value: 'any' },
  { label: 'Esse mês', value: 'month' },
  { label: 'Essa semana', value: 'week' },
];

const localOptions = [
  { label: 'Qualquer', value: 'any' },
  { label: 'Meu estado', value: 'state' },
  { label: 'Minha região', value: 'region' },
  { label: 'Minha cidade', value: 'city' },
];

function Jobs() {
  const history = useHistory();
  return (
    <Container>
      <Filters>
        <span>
          <FiSearch />
          filtros
        </span>
        <div>
          <SelectBlock options={localOptions} label="Local" />
          <SelectBlock options={dateOptions} label="Data" />
        </div>
      </Filters>
      <List>
        <Card>
          <Image src="https://images.unsplash.com/photo-1549996647-190b679b33d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"></Image>
          <Info>
            <h3>Vaga para Garçom</h3>
            <p>
              por <strong>Balzac's Restaurante</strong>
            </p>
            <p>
              em <strong>Santos - SP</strong>
            </p>
            <p>
              criado a <strong>3 dias</strong>
            </p>
          </Info>
          <Bottom onClick={() => history.push('/jobs/1')}>
            mais detalhes
            <FiChevronRight />
          </Bottom>
        </Card>
        <Card>
          <Image src="https://images.unsplash.com/photo-1549996647-190b679b33d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"></Image>
          <Info>
            <h3>Vaga para Garçom</h3>
            <p>
              por <strong>Balzac's Restaurante</strong>
            </p>
            <p>
              em <strong>Santos - SP</strong>
            </p>
            <p>
              criado a <strong>3 dias</strong>
            </p>
          </Info>
          <Bottom onClick={() => history.push('/jobs/1')}>
            mais detalhes
            <FiChevronRight />
          </Bottom>
        </Card>
        <Card>
          <Image src="https://images.unsplash.com/photo-1549996647-190b679b33d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"></Image>
          <Info>
            <h3>Vaga para Garçom</h3>
            <p>
              por <strong>Balzac's Restaurante</strong>
            </p>
            <p>
              em <strong>Santos - SP</strong>
            </p>
            <p>
              criado a <strong>3 dias</strong>
            </p>
          </Info>
          <Bottom onClick={() => history.push('/jobs/1')}>
            mais detalhes
            <FiChevronRight />
          </Bottom>
        </Card>
      </List>
    </Container>
  );
}

export default Jobs;
