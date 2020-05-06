import Model from '../../database/Model';

class Rating extends Model {
  constructor() {
    super().schema('rating', {
      id: {
        type: Number,
        primaryKey: true,
        required: true,
      },
      author_id: {
        type: Number,
        required: true,
      },
      target_id: {
        type: Number,
        required: true,
      },
      job_vacancy_id: {
        type: Number,
        primaryKey: true,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        required: true,
      },
      created_at: {
        type: Date,
        required: true,
      },
    });
  }
}

export default new Rating();
