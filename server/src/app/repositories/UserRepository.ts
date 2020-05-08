import Repository from '../../database/Repository';
import Database from '../../database/Database';

export default class UserRepository extends Repository {
  constructor(db: Database) {
    super(db, 'user', {
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
