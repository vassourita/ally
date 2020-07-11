import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronLeft, FiAlertTriangle, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import * as JobActions from '../../store/modules/jobs/actions';
import api from '../../services/api';

import Button from '../../components/Button';
import TextAreaBlock from '../../components/TextAreaBlock';

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
  ModalContainer,
  DoubleInput,
} from './styles';

function JobDetail() {
  const { id } = useParams();
  const job = useSelector(state => state.jobs.find(job => job.id === Number(id)));
  const history = useHistory();
  const dispatch = useDispatch();

  const [reportData, setReportData] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSendProposal = useCallback(
    async e => {
      e.preventDefault();
      try {
        const response = await api.post('/proposals', {
          jobVacancyId: job.id,
        });

        if (response.data.proposal) {
          toast.info('Candidatura enviada! Você receberá uma mensagem se ela for aceita', {
            onClick: () => history.push('/proposals'),
          });
          history.push('/jobs');
          dispatch(JobActions.removeJob(job.id));
        } else {
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      } catch (error) {
        toast.error('Ocorreu um erro inesperado em nosso servidor');
      }
    },
    [dispatch, history, job.id]
  );

  const handleSendReport = async e => {
    e.preventDefault();

    try {
      const response = await api.post('/reports', {
        description: reportData,
        jobVacancyId: job.id,
      });

      if (response.status === 201) {
        setModalOpen(false);
        toast.info('A vaga foi denunciada e será analisada');
        return history.goBack();
      }

      toast.error('Ocorreu um erro inesperado em nosso servidor');
    } catch {
      toast.error('Ocorreu um erro inesperado em nosso servidor');
    }
  };

  return (
    <Container>
      <Modal className="modal-refactor" overlayClassName="overlay-refactor" isOpen={modalOpen}>
        <ModalContainer>
          <Title>Denunciar vaga</Title>
          <TextAreaBlock
            label="Descrição"
            value={reportData}
            onChange={e => setReportData(e.target.value)}
          ></TextAreaBlock>
          <DoubleInput>
            <Button
              disabled={!reportData}
              style={{ borderColor: 'var(--ally-blue)' }}
              outlined
              onClick={handleSendReport}
            >
              <FiCheckSquare color="var(--ally-blue)" />
            </Button>
            <Button
              style={{ borderColor: 'var(--ally-red)' }}
              outlined
              onClick={() => {
                setReportData('');
                setModalOpen(false);
              }}
            >
              <FiXSquare color="var(--ally-red)" />
            </Button>
          </DoubleInput>
        </ModalContainer>
      </Modal>

      <Header>
        <FiChevronLeft onClick={() => history.goBack(-1)} size={30} />
        <h3>{job.name}</h3>
        <FiAlertTriangle
          onClick={() => setModalOpen(true)}
          color="var(--ally-red)"
          style={{ marginRight: '7px' }}
          size={24}
        />
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
            <h4>{job.reqMatchPercent}%</h4>
            <Text>dos requisitos</Text>
          </div>
          <div>
            <h4>{job.diffMatchPercent}%</h4>
            <Text>dos diferenciais</Text>
          </div>
        </Counter>
      </Body>
      <Footer>
        <Button outlined onClick={handleSendProposal}>
          Candidatar-me
        </Button>
      </Footer>
    </Container>
  );
}

export default JobDetail;
