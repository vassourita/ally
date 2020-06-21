import Knowledge from '@models/Knowledge';

import Repository from '@repositories/BaseRepository';

const KnowledgeRepository = new Repository<Knowledge>('knowledge', {
  id: { primary: true, },
  name: {},
  user_id: { },
  job_vacancy_id: { },
  knowledge_type_id: { },
  differential: {},
});

export default KnowledgeRepository;
