import Model from '../../database/Model';

export default class Rating extends Model {
  constructor() {
    super('rating', {
      id: {
        primary: true,
        required: true,
      },
      author_id: {
        required: true,
      },
      target_id: {
        required: true,
      },
      job_vacancy_id: {
        primary: true,
        required: true,
      },
      description: {
        required: true,
      },
      stars: {
        required: true,
      },
      created_at: {
        required: true,
      },
    });
  }
}
