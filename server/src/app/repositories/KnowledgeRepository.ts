import Knowledge from '@models/Knowledge';

import Repository from '@repositories/BaseRepository';

const KnowledgeRepository = new Repository<Knowledge>('knowledge', {
  id: { primary: true, },
});

export default KnowledgeRepository;
