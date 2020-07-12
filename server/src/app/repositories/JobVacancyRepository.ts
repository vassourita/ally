import { JobVacancy } from '@models/JobVacancy';

import { BaseRepository } from '@repositories/BaseRepository';

export class JobVacancyRepository extends BaseRepository<JobVacancy> {
  constructor() {
    super('job_vacancy', {
      id: { primary: true },
      employer_id: { },
      name: { },
      local: { },
      amount: { },
      created_at: { },
      description: { },
    });
  }
}
