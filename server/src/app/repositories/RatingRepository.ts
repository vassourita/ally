import Repository from '../../database/Repository';
import Database from '../../database/Database';

export default class RatingRepository extends Repository {
  constructor(db: Database) {
    super(db, 'rating', {
      id: {
        primary: true,
        required: true,
      },
      author_id: {
        required: true,
      },
      target_id: {
        required: true,
      },
      job_vacancy_id: {
        primary: true,
        required: true,
      },
      description: {
        required: true,
      },
      stars: {
        required: true,
      },
      created_at: {
        required: true,
      },
    });
  }
}
