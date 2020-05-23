import React, { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FiTrash, FiCheckSquare, FiXSquare, FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Button from '../../components/Button';
import CardBox from '../../components/CardBox';
import InputBlock from '../../components/InputBlock';
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
  JobInfo,
  DoubleInput,
} from './styles';

function Vacancies() {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    typeId: 0,
    name: '',
    differential: false,
  });
  const { id: jobId } = useParams();

  const actualJob = useMemo(() => jobs[Number(jobId - 1)], [jobId, jobs]);

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await api.get('/jobs');

        if (status === 200) {
          setJobs(data.jobs);
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

  const handleDeleteKnowledge = async (knowledge, job) => {
    try {
      const { data } = await api.put(`/jobs/${job.id}`, {
        removeKnowledge: knowledge.id,
      });

      if (data.updated.removeKnowledge) {
        const index = jobs.findIndex(j => j.id === job.id);
        const updatedJobs = [...jobs];
        updatedJobs[index] = data.job;
        return setJobs(updatedJobs);
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  const handleAddKnowledge = async () => {
    try {
      const { data } = await api.put(`/jobs/${actualJob.id}`, {
        addKnowledge: {
          typeId: editData.typeId,
          name: editData.name,
          differential: editData.differential,
        },
      });

      if (data.updated.addKnowledge) {
        const index = jobs.findIndex(j => j.id === actualJob.id);
        const updatedJobs = [...jobs];
        updatedJobs[index] = data.job;
        return setJobs(updatedJobs);
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  return (
    <Container>
      <Modal className="modal-refactor modal-shadow" overlayClassName="overlay-refactor" isOpen={modalOpen}>
        <CardHeader
          title={`Novo ${editData.differential ? 'diferencial' : 'requisito'}`}
          sub={`Escolha o tipo e nome do ${editData.differential ? 'diferencial' : 'requisito'} a ser adicionado`}
        />
        <InputBlock
          label="Nome"
          id="knowledge-name"
          value={editData.name}
          onChange={e => setEditData({ ...editData, name: e.target.value })}
        ></InputBlock>
        <DoubleInput>
          <Button style={{ borderColor: 'var(--ally-blue)' }} outlined onClick={handleAddKnowledge}>
            <FiCheckSquare color="var(--ally-blue)" />
          </Button>
          <Button
            style={{ borderColor: 'var(--ally-red)' }}
            outlined
            onClick={() => {
              setEditData({ typeId: 0, name: '' });
              setModalOpen(false);
            }}
          >
            <FiXSquare color="var(--ally-red)" />
          </Button>
        </DoubleInput>
      </Modal>

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
          <header>
            <CardHeader
              title="Propostas"
              sub={
                jobId
                  ? `Visualize as propostas recebidas em sua ${actualJob?.name}`
                  : 'Selecione uma vaga para visualizar suas propostas'
              }
            />
            <Button outlined onClick={() => setModalOpen(true)}>
              <FiEdit />
            </Button>
          </header>
          <Title style={{ marginTop: '30px' }}>Descrição:</Title>
          <h6>{actualJob?.description}</h6>
          {actualJob?.name && (
            <JobInfo>
              <div>
                <Title>Requisitos:</Title>
                {actualJob?.knowledges?.length ? (
                  actualJob?.knowledges
                    ?.filter(k => !k.differential)
                    .map(knowledge => (
                      <section key={knowledge.id}>
                        <h6>
                          {knowledge.type.name} - {knowledge.name}
                        </h6>
                        <FiTrash onClick={() => handleDeleteKnowledge(knowledge, actualJob)} />
                      </section>
                    ))
                ) : (
                  <h6>Não há requisitos nesta vaga</h6>
                )}
              </div>
              <div>
                <Title>Diferenciais:</Title>
                {actualJob?.knowledges?.length ? (
                  actualJob?.knowledges
                    ?.filter(k => k.differential)
                    .map(knowledge => (
                      <section key={knowledge.id}>
                        <h6>
                          {knowledge.type.name} - {knowledge.name}
                        </h6>
                        <FiTrash onClick={() => handleDeleteKnowledge(knowledge, actualJob)} />
                      </section>
                    ))
                ) : (
                  <h6>Não há diferenciais nesta vaga</h6>
                )}
              </div>
            </JobInfo>
          )}
        </CardBox>
      </Header>
      <List>
        {actualJob?.proposals?.map(proposal => (
          <ListItem key={proposal.id} className="modal-shadow">
            <UserImg src={`${process.env.REACT_APP_FILES_URL}${proposal.user.image_url}`} alt={proposal.user.name} />
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
