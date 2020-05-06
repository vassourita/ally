import Model from '../../database/Model';

class Knowledge extends Model {
  constructor() {
    super().schema('job_vacancy', {
      id: {
        type: Number,
        primaryKey: true,
        required: true,
      },
      user_id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    });
  }
}

export default new Knowledge();
