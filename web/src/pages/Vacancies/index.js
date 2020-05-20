import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

import api from '../../services/api';
import Auth from '../../services/auth';

import CardBox from '../../components/CardBox';
import CardHeader from '../../components/CardHeader';

import Img from '../../assets/test/user.jpg';

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
        const { status, data } = await api.get(`/jobs?user=${Auth.getUserId()}`);

        if (status === 200) {
          setJobs(data.jobVacancies);
          setActualJob(data.jobVacancies.find(j => j.id.toString() === jobId));
        }
      } catch {}
    })();
  }, [jobId]);

  const getJobAmount = number => {
    if (number === 1) {
      return '1 vaga disponível';
    }
    return `${number} vagas disponíveis`;
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
                <Badge>0</Badge>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>
      <Header>
        <CardBox>
          <CardHeader
            title="Propostas"
            sub={
              actualJob
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
        ))}
      </List>
    </Container>
  );
}

export default Vacancies;
