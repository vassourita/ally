import JobVacancy from '@models/JobVacancy';

import Repository from '@repositories/BaseRepository';

const JobVacancyRepository = new Repository<JobVacancy>('job_vacancy', {
  id: { primary: true, },
  employer_id: { },
  name: { },
  local: { },
  amount: { },
  created_at: { },
  description: { },
});

export default JobVacancyRepository;
