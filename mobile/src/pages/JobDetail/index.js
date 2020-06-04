import React from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

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

  function handleSendProposal() {
    api
      .post('/proposals', {
        jobVacancyId: job.id,
      })
      .then(response => {
        if (response.data.proposal) {
          toast.info('Proposta enviada! Você receberá uma mensagem se a proposta for aceita');
          history.goBack(-1);
        }
      });
  }

  return (
    <Container>
      <Header>
        <FiChevronLeft onClick={() => history.goBack(-1)} size={30} />
        <h3>{job.name}</h3>
        <FiChevronLeft color="transparent" size={30} />
      </Header>
      <Body>
        <Employer>
          <Title>Sobre a empresa</Title>
          <EmployerImage>
            <img src={`${process.env.REACT_APP_FILES_URL}${job.employer.image_url}`} alt={job.employer.name} />
            <EmployerName>{job.employer.name}</EmployerName>
          </EmployerImage>
          <Text>{job.employer.about}</Text>
          <EmployerAddress>
            Localizada em:
            <br />
            <strong>
              {job.employer.city} - {job.employer.state}
            </strong>
          </EmployerAddress>
        </Employer>
        <Title>Descrição da vaga</Title>
        <Text>{job.description}</Text>
        <Title style={{ marginTop: '30px' }}>Requisitos e Diferenciais</Title>
        <Text>Você cumpre:</Text>
        <Counter>
          <div>
            <h4>0%</h4>
            <Text>dos requisitos</Text>
          </div>
          <div>
            <h4>0%</h4>
            <Text>dos diferenciais</Text>
          </div>
        </Counter>
      </Body>
      <Footer>
        <Button outlined onClick={handleSendProposal}>
          Enviar Proposta
        </Button>
      </Footer>
    </Container>
  );
}

export default JobDetail;
