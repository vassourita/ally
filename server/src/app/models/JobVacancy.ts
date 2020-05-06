import Model from '../../database/Model';

export default class Knowledge extends Model {
  constructor() {
    super('job_vacancy', {
      id: {
        primary: true,
        required: true,
      },
      user_id: {
        required: true,
      },
      name: {
        required: true,
      },
      description: {
        required: true,
      },
      amount: {
        required: true,
      },
    });
  }
}
