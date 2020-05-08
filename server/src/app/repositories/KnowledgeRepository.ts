import Repository from '../../database/Repository';
import Database from '../../database/Database';

export default class KnowledgeRepository extends Repository {
  constructor(db: Database) {
    super(db, 'knowledge', {
      id: {
        primary: true,
        required: true,
      },
      name: {
        required: true,
      },
      knowledge_type_id: {
        required: true,
      },
      user_id: {
        required: true,
      },
      job_vacancy_id: {
        required: true,
      },
      date: {},
    });
  }
}
