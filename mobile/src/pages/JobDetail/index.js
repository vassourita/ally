import React from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../components/Button';

import { Container, Header, Body, Employer, Footer } from './styles';

function JobDetail() {
  const { id } = useParams();
  const history = useHistory();
  const job = useSelector(state => state.jobs.find(job => job.id === Number(id)));

  return (
    <Container>
      <Header>
        <FiChevronLeft onClick={() => history.goBack(-1)} size={30} />
        <h3>Vaga para Entregador</h3>
        <FiChevronLeft color="transparent" size={30} />
      </Header>
      <Body>
        <Employer></Employer>
      </Body>
      <Footer>
        <Button outlined>Enviar Proposta</Button>
      </Footer>
    </Container>
  );
}

export default JobDetail;
