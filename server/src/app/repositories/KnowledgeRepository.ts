import { Knowledge } from '@models/Knowledge';

import { BaseRepository } from '@repositories/BaseRepository';

export const KnowledgeRepository = new BaseRepository<Knowledge>('knowledge', {
  id: { primary: true, },
  name: {},
  user_id: { },
  job_vacancy_id: { },
  knowledge_type_id: { },
  differential: {},
});
