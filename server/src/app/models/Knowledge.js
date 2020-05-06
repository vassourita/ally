import Model from '../../database/Model';

class Knowledge extends Model {
  constructor() {
    super().schema('knowledge', {
      id: {
        type: Number,
        primaryKey: true,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      knowledge_type_id: {
        type: Number,
        required: true,
      },
      user_id: {
        type: Number,
        required: true,
      },
      job_vacancy_id: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: false,
      },
    });
  }
}

export default new Knowledge();
