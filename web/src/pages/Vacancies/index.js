import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FiTrash, FiCheckSquare, FiXSquare, FiEdit } from 'react-icons/fi';

import * as JobActions from '../../store/modules/jobs/actions';
import api from '../../services/api';

import Button from '../../components/Button';
import CardBox from '../../components/CardBox';
import CheckBox from '../../components/CheckBox';
import InputBlock from '../../components/InputBlock';
import CardHeader from '../../components/CardHeader';
import SelectBlock from '../../components/SelectBlock';

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
  ModalDivisor,
  Counter,
  Inputs,
} from './styles';

const options = [
  { label: 'Especialização', value: 1 },
  { label: 'Graduação', value: 2 },
  { label: 'Certificação', value: 3 },
  { label: 'Curso', value: 4 },
  { label: 'Experiência', value: 5 },
  { label: 'Conhecimento', value: 6 },
];

function Vacancies() {
  const history = useHistory();
  const { id: jobId } = useParams();

  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs);

  const actualJob = jobs.find(j => j.id === Number(jobId));
  const actualJobIndex = jobs.findIndex(j => j.id === Number(jobId));
  const [editData, setEditData] = useState({
    typeId: 0,
    name: '',
    differential: false,
    amount: actualJob?.amount,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const listRef = useRef(null);

  const calculateListScroll = () => {
    if (
      actualJob?.proposals.length > 1 ||
      (listRef.current && listRef.current.scrollHeight > listRef.current.clientHeight)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await api.get('/jobs');

        if (status === 200) {
          dispatch(JobActions.setJobs(data.jobs));
        } else {
          dispatch(JobActions.setJobs([]));
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      } catch {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    })();
  }, [jobId, dispatch]);

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
        return dispatch(JobActions.updateJob(job.id, data.job));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  const handleAddKnowledge = async () => {
    try {
      const { data } = await api.put(`/jobs/${actualJob.id}`, {
        addKnowledge: [
          {
            typeId: editData.typeId,
            name: editData.name,
            differential: editData.differential,
          },
        ],
      });

      if (data.updated.addKnowledge) {
        setModalOpen(false);
        return dispatch(JobActions.updateJob(actualJob.id, data.job));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    setModalOpen(false);
  };

  const handleDeleteJob = async e => {
    try {
      const { data } = await api.delete(`/jobs/${actualJob?.id}`);

      if (data.deleted) {
        setModalDeleteOpen(false);
        dispatch(JobActions.removeJob(actualJob.id));
        toast.info('Vaga deletada!');
        return history.push('/vacancies');
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    setModalDeleteOpen(false);
  };

  const handleChangeAmount = async () => {
    try {
      const { data } = await api.put(`/jobs/${actualJob.id}`, {
        amount: editData.amount,
      });

      if (data.updated.amount) {
        setModalOpen(false);
        return dispatch(JobActions.updateJob(actualJob.id, data.job));
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
    setModalOpen(false);
  };

  const handleUpdateProposal = async (id, status, name) => {
    try {
      const response = await api.put(`/proposals/${id}`, { status });

      if (response.data.updated) {
        if (status === true) {
          toast.info(`Proposta aceita! Envie uma mensagem para ${name}`);
          history.push(`/chat/${response.data.chat.id}`);
        } else {
          toast.info(`A proposta feita por ${name} foi rejeitada`);
          dispatch(JobActions.RemoveJobProposal(actualJobIndex, id));
        }
      } else {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  return (
    <Container>
      <Modal className="modal-refactor modal-shadow" overlayClassName="overlay-refactor" isOpen={modalOpen}>
        <ModalDivisor>
          <div>
            <CardHeader
              title={`Novo ${editData.differential ? 'diferencial' : 'requisito'}`}
              sub={`Escolha o tipo e nome do ${editData.differential ? 'diferencial' : 'requisito'} a ser adicionado`}
            />
            <SelectBlock
              onChange={({ label, value }) => setEditData({ ...editData, typeId: value })}
              label="Tipo"
              options={options}
            ></SelectBlock>
            <InputBlock
              label="Nome"
              id="knowledge-name"
              value={editData.name}
              onChange={e => setEditData({ ...editData, name: e.target.value })}
            ></InputBlock>
            <CheckBox
              checked={editData.differential}
              onChange={e => setEditData({ ...editData, differential: e.target.checked })}
            >
              Diferencial
            </CheckBox>
            <DoubleInput>
              <Button
                disabled={!editData.name || !editData.typeId}
                style={{ borderColor: 'var(--ally-blue)' }}
                outlined
                onClick={handleAddKnowledge}
              >
                <FiCheckSquare color="var(--ally-blue)" />
              </Button>
              <Button
                style={{ borderColor: 'var(--ally-red)' }}
                outlined
                onClick={() => {
                  setEditData({ typeId: 0, name: '', differential: false });
                  setModalOpen(false);
                }}
              >
                <FiXSquare color="var(--ally-red)" />
              </Button>
            </DoubleInput>
          </div>
          <div>
            <CardHeader
              title="Alterar quantidade"
              sub={`Altere a quantidade de vagas disponíveis. Atual: ${actualJob?.amount}`}
            />
            <InputBlock
              type="number"
              min="0"
              label="Quantidade"
              id="knowledge-amount"
              value={editData.amount}
              onChange={e => setEditData({ ...editData, amount: e.target.value })}
            ></InputBlock>
            <DoubleInput>
              <Button
                disabled={!editData.amount}
                style={{ borderColor: 'var(--ally-blue)' }}
                outlined
                onClick={handleChangeAmount}
              >
                <FiCheckSquare color="var(--ally-blue)" />
              </Button>
              <Button
                style={{ borderColor: 'var(--ally-red)' }}
                outlined
                onClick={() => {
                  setEditData({ typeId: 0, name: '', differential: false, amount: actualJob.amount });
                  setModalOpen(false);
                }}
              >
                <FiXSquare color="var(--ally-red)" />
              </Button>
            </DoubleInput>
          </div>
        </ModalDivisor>
      </Modal>

      <Modal className="modal-refactor modal-shadow" overlayClassName="overlay-refactor" isOpen={modalDeleteOpen}>
        <CardHeader title="Deletar vaga" sub={`Você está prestes a deletar a vaga: ${actualJob?.name}. Continuar?`} />
        <DoubleInput>
          <Button outlined onClick={() => setModalDeleteOpen(false)}>
            <span>Cancelar</span>
          </Button>
          <Button
            style={{ color: 'var(--ally-red)', borderColor: 'var(--ally-red)' }}
            outlined
            onClick={handleDeleteJob}
          >
            <span>Deletar</span>
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
              title={jobId ? actualJob?.name : 'Propostas'}
              sub={
                jobId
                  ? `Visualize as propostas recebidas em sua vaga e edite-a`
                  : 'Selecione uma vaga para visualizar suas propostas'
              }
            />
            {actualJob && (
              <div style={{ display: 'flex' }}>
                <Button outlined onClick={() => setModalOpen(true)}>
                  <FiEdit />
                </Button>
                <Button
                  style={{ borderColor: 'var(--ally-red)', marginLeft: '20px' }}
                  outlined
                  onClick={() => setModalDeleteOpen(true)}
                >
                  <FiTrash color="var(--ally-red)" />
                </Button>
              </div>
            )}
          </header>
          {actualJob && (
            <>
              <Title style={{ marginTop: '30px' }}>Descrição:</Title>
              <h6>{actualJob?.description}</h6>
            </>
          )}
          {actualJob?.name && (
            <JobInfo>
              <div>
                <Title>Requisitos:</Title>
                {actualJob?.knowledges.filter(k => !k.differential).length ? (
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
                {actualJob?.knowledges?.filter(k => k.differential).length ? (
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
      <List hasScroll={calculateListScroll()} ref={listRef}>
        {actualJob?.proposals?.map(proposal => (
          <ListItem key={proposal.id} className="modal-shadow">
            <UserImg
              onClick={() => history.push(`/users/${proposal.user.id}`)}
              src={`${process.env.REACT_APP_FILES_URL}${proposal.user.image_url}`}
              alt={proposal.user.name}
            />
            <UserName>
              <h3>{proposal.user.name}</h3>
              <Link to={`/users/${proposal.user.id}`}>Clique para ver o perfil</Link>
            </UserName>
            <UserInfo>
              <Counter>
                <div className="stat-top">
                  <h4>100%</h4>
                  <p>dos requisitos</p>
                </div>
                <div className="stat-bottom">
                  <h4>100%</h4>
                  <p>dos diferenciais</p>
                </div>
                <div className="data-top">
                  {actualJob?.knowledges
                    ?.filter(k => !k.differential)
                    .map(knowledge => (
                      <section key={knowledge.id}>
                        <span>
                          {knowledge.type.name} - {knowledge.name} <FiCheckSquare />
                        </span>
                      </section>
                    ))}
                </div>
                <div className="data-bottom">
                  {actualJob?.knowledges
                    ?.filter(k => k.differential)
                    .map(knowledge => (
                      <section key={knowledge.id}>
                        <span>
                          {knowledge.type.name} - {knowledge.name} <FiCheckSquare />
                        </span>
                      </section>
                    ))}
                </div>
              </Counter>
              <Inputs>
                <Button
                  onClick={() => handleUpdateProposal(proposal.id, true, proposal.user.name)}
                  outlined
                  style={{ color: 'var(--ally-blue)', borderColor: 'var(--ally-blue)' }}
                >
                  Aceitar <FiCheckSquare />
                </Button>
                <Button
                  onClick={() => handleUpdateProposal(proposal.id, false, proposal.user.name)}
                  outlined
                  style={{ color: 'var(--ally-red)', borderColor: 'var(--ally-red)' }}
                >
                  Rejeitar <FiXSquare />
                </Button>
              </Inputs>
            </UserInfo>
          </ListItem>
        )) ||
          (jobId && <CardBox>Não há propostas para esta vaga ainda...</CardBox>)}
      </List>
    </Container>
  );
}

export default Vacancies;
