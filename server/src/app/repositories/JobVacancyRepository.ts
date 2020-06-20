import JobVacancy from '@models/JobVacancy';

import Repository from '@repositories/BaseRepository';

const JobVacancyRepository = new Repository<JobVacancy>('job_vacancy', {
  id: { primary: true, },
});

export default JobVacancyRepository;
