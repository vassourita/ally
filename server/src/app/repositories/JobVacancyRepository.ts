import Repository from '../../database/Repository';
import Database from '../../database/Database';

export default class JobVacancyRepository extends Repository {
  constructor(db: Database) {
    super(db, 'job_vacancy', {
      id: {
        primary: true,
        required: true,
      },
      user_id: {
        required: true,
      },
      name: {
        required: true,
      },
      description: {
        required: true,
      },
      amount: {
        required: true,
      },
    });
  }
}
