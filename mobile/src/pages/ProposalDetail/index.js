import React from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft, FiClock, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import { Container, Header, Body, Employer, Title, Text, EmployerImage, EmployerName, EmployerAddress } from './styles';

function ProposalDetail() {
  const { id } = useParams();
  const history = useHistory();
  const proposal = useSelector(state => state.proposals.find(job => job.id === Number(id)));

  function getStatus(status) {
    if (status === 'awaiting') {
      return (
        <span>
          aguardando resposta
          <FiClock />
        </span>
      );
    }
    if (status === 'denied') {
      return (
        <span style={{ color: 'var(--ally-red)' }}>
          não aceito
          <FiXCircle />
        </span>
      );
    }
    if (status === 'accepted') {
      return (
        <span style={{ color: 'var(--ally-blue)' }}>
          conversa disponível
          <FiCheckCircle />
        </span>
      );
    }
  }
  return (
    <Container>
      <Header>
        <FiChevronLeft onClick={() => history.goBack(-1)} size={30} />
        <h3>{proposal.job.name}</h3>
        <FiChevronLeft color="transparent" size={30} />
      </Header>
      <Body>
        <Employer>
          <Title>Sobre a empresa</Title>
          <EmployerImage>
            <img
              src={`${process.env.REACT_APP_FILES_URL}${proposal.job.employer.image_url}`}
              alt={proposal.job.employer.name}
            />
            <EmployerName>{proposal.job.employer.name}</EmployerName>
          </EmployerImage>
          <Text>{proposal.job.employer.about}</Text>
          <EmployerAddress>
            Localizada em:
            <br />
            <strong>
              {proposal.job.employer.city} - {proposal.job.employer.state}
            </strong>
          </EmployerAddress>
        </Employer>
        <Title>Status da proposta</Title>
        <Text>{getStatus(proposal.status)}</Text>
      </Body>
    </Container>
  );
}

export default ProposalDetail;
