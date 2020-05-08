import Repository from '../../database/Repository';
import Database from '../../database/Database';

export default class KnowledgeTypeRepository extends Repository {
  constructor(db: Database) {
    super(db, 'knowledge_type', {
      id: {
        primary: true,
        required: true,
      },
      name: {
        required: true,
      },
    });
  }
}
