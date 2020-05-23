import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Button from '../../components/Button';
import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import {
  Container,
  Header,
  Nav,
  NavList,
  NavItem,
  Badge,
  Title,
  Available,
  List,
  ListItem,
  UserImg,
  UserName,
  UserInfo,
} from './styles';

function Vacancies() {
  const [jobs, setJobs] = useState([]);
  const [actualJob, setActualJob] = useState(null);
  const { id: jobId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await api.get(`/jobs`);

        if (status === 200) {
          setJobs(data.jobs);
          setActualJob(data.jobs.find(j => j.id.toString() === jobId));
        }
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    })();
  }, [jobId]);

  const getJobAmount = amount => {
    if (amount === 1) {
      return '1 vaga disponível';
    }
    return `${amount} vagas disponíveis`;
  };

  return (
    <Container>
      <Nav className="modal-shadow">
        <CardHeader title="Suas vagas" sub="Visualize as vagas que você criou e as suas propostas" />
        <NavList>
          {jobs.map(job => (
            <NavItem key={job.id}>
              <NavLink activeClassName="nav-link-active" to={`/vacancies/${job.id}`}>
                <div>
                  <Title>{job.name}</Title>
                  <Available>{getJobAmount(job.amount)}</Available>
                </div>
                <Badge>{job.proposals?.length || 0}</Badge>
              </NavLink>
            </NavItem>
          ))}
          <NavItem>
            <NavLink activeClassName="nav-link-active" to="/vacancies/new">
              <Button>Criar nova vaga</Button>
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
      <Header>
        <CardBox>
          <CardHeader
            title="Propostas"
            sub={
              jobId
                ? `Visualize as propostas recebidas em sua ${actualJob?.name}`
                : 'Selecione uma vaga para visualizar suas propostas'
            }
          />
        </CardBox>
      </Header>
      <List>
        {actualJob?.proposals?.map(proposal => (
          <ListItem key={proposal.id} className="modal-shadow">
            <UserImg src={`${process.env.REACT_APP_FILES_URL}${proposal.user.image_url}`} alt="" />
            <UserName>
              <h3>{proposal.user.name}</h3>
              <Link to={`/users/${proposal.user.id}`}>Clique para ver o perfil</Link>
            </UserName>
            <UserInfo></UserInfo>
          </ListItem>
        )) ||
          (jobId && <CardBox>Não há propostas para esta vaga ainda...</CardBox>)}
      </List>
    </Container>
  );
}

export default Vacancies;
