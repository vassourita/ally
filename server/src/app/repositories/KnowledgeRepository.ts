import { Knowledge } from '@models/Knowledge';

import { BaseRepository } from '@repositories/BaseRepository';

export class KnowledgeRepository extends BaseRepository<Knowledge> {
  constructor() {
    super('knowledge', {
      id: { primary: true, },
      name: {},
      user_id: { },
      job_vacancy_id: { },
      knowledge_type_id: { },
      differential: {},
    });
  }
}
