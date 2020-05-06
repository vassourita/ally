import Model from '../../database/Model';

export default class Knowledge extends Model {
  constructor() {
    super('knowledge', {
      id: {
        primary: true,
        required: true,
      },
      name: {
        required: true,
      },
      knowledge_type_id: {
        required: true,
      },
      user_id: {
        required: true,
      },
      job_vacancy_id: {
        required: true,
      },
      date: {},
    });
  }
}
