import BaseRepository from './BaseRepository';

const ReportRepository = new BaseRepository('report', {
  id: {
    primary: true,
    type: String(),
  },
  description: {
    type: String(),
  },
  user_id: {
    returning: false,
    type: Number(),
  },
  job_vacancy_id: {
    returning: false,
    type: Number(),
  },
  created_at: {
    type: String(),
  },
});

export default ReportRepository;
