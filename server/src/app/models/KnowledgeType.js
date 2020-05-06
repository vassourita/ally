import Model from '../../database/Model';

class KnowledgeType extends Model {
  constructor() {
    super().schema('knowledge_type', {
      id: {
        type: Number,
        primaryKey: true,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    });
  }
}

export default new KnowledgeType();
