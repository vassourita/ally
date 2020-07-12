import { Report } from '@models/Report';

import { BaseRepository } from '@repositories/BaseRepository';

export class ReportRepository extends BaseRepository<Report> {
  constructor() {
    super('report', {
      id: { primary: true },
      description: { },
      user_id: { },
      job_vacancy_id: { },
      created_at: { },
    });
  }
}
