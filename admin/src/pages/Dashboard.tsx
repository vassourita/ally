import React, { useState, useEffect } from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { formatRelative } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

import Logo from '../assets/logo@3x.png'
import api from '../services/api';

import { Container, Header, Main, Title, Reports, Report } from './styles';
import Button from '../components/Button';

interface IReport {
  id: number;
  active: boolean;
  description: string;
  created_at: string;
  job: any;
}

const Dashboard: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    api
      .get('/reports')
      .then(response => setReports(response.data.reports.map((report: IReport) => ({
        ...report,
        active: false,
      }))));
  }, []);

  const handleDeleteJob = (id: number) => {
    api.delete(`/jobs/${id}`).then(response => {
      if (response.data.deleted) {
        setReports(reports.filter(report => report.job.id !== id))
      }
    })
  }

  const handleDeleteReport = (id: number) => {
    api.delete(`/reports/${id}`).then(response => {
      if (response.data.deleted) {
        setReports(reports.filter(report => report.id !== id))
      }
    })
  }

  const getDate = (timestamp: string) => {
    return formatRelative(new Date(timestamp), new Date(), { locale: pt_BR });
  };

  return (
    <Container>
      <Header>
        <img src={Logo} alt="Logotipo" />
      </Header>
      <Main>

      <Title>Denúncias</Title>
      <Reports>
        {reports.map(report => (
          <Report active={report.active}>
            {!report.active ? (
              <>
                <FiPlusCircle onClick={() => setReports(reports.map(r => r.id === report.id ? ({
                  ...r,
                  active: !r.active
                }): r))} size={18} />
                <div>
                  <h3>{report.job.name}</h3>
                  <p>por <strong>{report.job.employer.name}</strong></p>
                </div>
                <p>denunciado <strong>{getDate(report.created_at)}</strong></p>
              </>
            ) : (
              <>
                <FiMinusCircle onClick={() => setReports(reports.map(r => r.id === report.id ? ({
                  ...r,
                  active: !r.active
                }): r))} size={18} />
                <div>
                  <h3>{report.job.name}</h3>
                  <p>por <strong>{report.job.employer.name}</strong></p>
                  <p>em <strong>{report.job.employer.city} - {report.job.employer.state}</strong></p>
                  <p>criado em <strong>{getDate(report.job.created_at)}</strong></p>
                </div>
                <div>
                  <p>
                  <strong>Descrição da vaga:<br/></strong>
                  {report.job.description}
                  </p>
                </div>
                <div>
                  <p>
                  <strong>Descrição da empresa:<br/></strong>
                  {report.job.employer.about}
                  </p>
                </div>
                <div>
                  <p>
                  <strong>Descrição da denúncia:<br/></strong>
                  {report.description}
                  </p>
                </div>
                <div>
                  <p>denunciado <strong>{getDate(report.created_at)}</strong></p>
                </div>
                <div></div>
                <div>
                  <Button onClick={() => handleDeleteJob(report.job.id)} outlined>Apagar vaga</Button>
                </div>
                <div>
                  <Button onClick={() => handleDeleteReport(report.id)} outlined>Ignorar denúncia</Button>
                </div>
              </>
            )}
          </Report>
        ))}
      </Reports>
      </Main>
    </Container>
  );
}

export default Dashboard;