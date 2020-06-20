import Report from '@models/Report';

import BaseRepository from '@repositories/BaseRepository';

const ReportRepository = new BaseRepository<Report>('report', {
  id: { primary: true, },
  description: { },
  user_id: { },
  job_vacancy_id: { },
  created_at: { },
});

export default ReportRepository;
