import Model from '../../database/Model';

export default class KnowledgeType extends Model {
  constructor() {
    super('knowledge_type', {
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
