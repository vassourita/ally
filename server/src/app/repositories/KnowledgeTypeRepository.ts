import KnowledgeType from '@models/KnowledgeType';

import Repository from '@repositories/BaseRepository';

const KnowledgeTypeRepository = new Repository<KnowledgeType>('knowledge_type', {
  id: { primary: true, },
});

export default KnowledgeTypeRepository;
