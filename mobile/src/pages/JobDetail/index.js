import React from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../components/Button';

import {
  Container,
  Header,
  Body,
  Employer,
  Footer,
  Title,
  Text,
  EmployerImage,
  EmployerName,
  EmployerAddress,
  Counter,
} from './styles';

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
        <Employer>
          <Title>Sobre a empresa</Title>
          <EmployerImage>
            <img
              src="https://images.unsplash.com/photo-1549996647-190b679b33d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt="Empresa"
            />
            <EmployerName>Balzac's Restaurante</EmployerName>
          </EmployerImage>
          <Text>O restaurante mais TOPPER de toda a cidade, servindo Santos com qualidade a mais de 800 anos!</Text>
          <EmployerAddress>
            Localizada em:
            <br />
            <strong>Santos - SṔ</strong>
          </EmployerAddress>
        </Employer>
        <Title>Descrição da vaga</Title>
        <Text>Buscamos entregadores para entregar durante o dia, de segunda a sexta.</Text>
        <Title style={{ marginTop: '30px' }}>Requisitos e Diferenciais</Title>
        <Text>Você cumpre:</Text>
        <Counter>
          <div>
            <h4>100%</h4>
            <Text>dos requisitos</Text>
          </div>
          <div>
            <h4>50%</h4>
            <Text>dos diferenciais</Text>
          </div>
        </Counter>
      </Body>
      <Footer>
        <Button outlined>Enviar Proposta</Button>
      </Footer>
    </Container>
  );
}

export default JobDetail;
