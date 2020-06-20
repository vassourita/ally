import Knowledge from '@models/Knowledge';

import Repository from '@repositories/BaseRepository';

const KnowledgeRepository = new Repository<Knowledge>('knowledge', {
  id: { primary: true, },
  knowledge_type_id: { },
  user_id: { },
  job_vacancy_id: { },
});

export default KnowledgeRepository;
