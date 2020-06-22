import { KnowledgeType } from '@models/KnowledgeType';

import { BaseRepository } from '@repositories/BaseRepository';

export const KnowledgeTypeRepository = new BaseRepository<KnowledgeType>('knowledge_type', {
  id: { primary: true, },
  name: { },
});
