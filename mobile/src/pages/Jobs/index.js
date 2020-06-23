import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FiSearch, FiChevronRight } from 'react-icons/fi';
import { differenceInCalendarDays } from 'date-fns';

import * as JobActions from '../../store/modules/jobs/actions';
import api from '../../services/api';

import SelectBlock from '../../components/SelectBlock';

import { Container, Filters, List, Card, Image, Info, Bottom, NoVacancies } from './styles';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

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

const orderOptions = [
  { label: 'Mais antigas', value: 'older' },
  { label: 'Mais recentes', value: 'newer' },
  { label: 'Requisitos', value: 'requirements' },
];

function Jobs() {
  const [local, setLocal] = useState('any');
  const [date, setDate] = useState('any');
  const [order, setOrder] = useState('newer');
  const [loading, setLoading] = useState(true);

  const jobs = useSelector(state => state.jobs);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/opportunities?days=${date}&local=${local}`)
      .then(response => {
        if (response.data.jobs) {
          dispatch(JobActions.setJobs(response.data.jobs));
        } else {
          dispatch(JobActions.setJobs([]));
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
        setLoading(false);
      })
      .catch(() => {
        dispatch(JobActions.setJobs([]));
        toast.error('Ocorreu um erro inesperado em nosso servidor');
        setLoading(false);
      });
  }, [dispatch, local, date]);

  const getJobDate = useCallback(jobDate => {
    const difference = differenceInCalendarDays(new Date(jobDate), new Date());

    if (difference === 0) {
      return 'hoje';
    }
    if (difference === -1) {
      return `ontem`;
    }
    return `a ${-difference} dias`;
  }, []);

  const orderJobs = useCallback(
    (a, b) => {
      switch (order) {
        case 'newer': {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        case 'older': {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        case 'requirements': {
          return -1;
        }
        default: {
          return 0;
        }
      }
    },
    [order]
  );

  return (
    <Container>
      <Filters>
        <span>
          <FiSearch />
          filtros
        </span>
        <div>
          <SelectBlock onChange={({ value }) => setLocal(value)} label="Local" options={localOptions} />
          <SelectBlock onChange={({ value }) => setDate(value)} label="Data" options={dateOptions} />
          <SelectBlock
            onChange={({ value }) => setOrder(value)}
            label="Ordem"
            options={orderOptions}
            defaultOption={1}
          />
        </div>
      </Filters>
      <List>
        {!loading && !jobs.length && <NoVacancies>Não há nenhuma vaga disponível no momento</NoVacancies>}
        {jobs.sort(orderJobs).map(job => (
          <Card onClick={() => history.push(`/jobs/${job.id}`)} key={job.id}>
            <Image src={`${process.env.REACT_APP_FILES_URL}${job.employer.image_url}`} alt={job.employer.name}></Image>
            <Info>
              <h3>{job.name}</h3>
              <p>
                por <strong>{job.employer.name}</strong>
              </p>
              <p>
                em{' '}
                <strong>
                  {job.employer.city} - {job.employer.state}
                </strong>
              </p>
              <p>
                criado<strong> {getJobDate(job.created_at)}</strong>
              </p>
            </Info>
            <Bottom onClick={() => history.push(`/jobs/${job.id}`)}>
              mais detalhes
              <FiChevronRight />
            </Bottom>
          </Card>
        ))}
      </List>
    </Container>
  );
}

export default Jobs;
