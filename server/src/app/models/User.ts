import Model from '../../database/Model';

export default class User extends Model {
  constructor() {
    super('user', {
      id: {
        primary: true,
        required: true,
      },
      name: {
        required: true,
      },
      email: {
        required: true,
      },
      phone: {
        required: true,
      },
      city: {
        required: true,
      },
      microregion_id: {
        required: true,
      },
      birth: {
        required: true,
      },
      password: {
        returning: false,
        required: true,
      },
      image: {},
      about: {},
      employer: {
        required: true,
      },
    });
  }
}
