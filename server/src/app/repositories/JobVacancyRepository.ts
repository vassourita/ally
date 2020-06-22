import { JobVacancy } from '@models/JobVacancy';

import { BaseRepository } from '@repositories/BaseRepository';

export const JobVacancyRepository = new BaseRepository<JobVacancy>('job_vacancy', {
  id: { primary: true, },
  employer_id: { },
  name: { },
  local: { },
  amount: { },
  created_at: { },
  description: { },
});
