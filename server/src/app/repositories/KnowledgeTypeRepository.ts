import { KnowledgeType } from '@models/KnowledgeType';

import { BaseRepository } from '@repositories/BaseRepository';

export class KnowledgeTypeRepository extends BaseRepository<KnowledgeType> {
  constructor() {
    super('knowledge_type', {
      id: { primary: true, },
      name: { },
    });
  }
}
