import { User } from '@models/User';

import { BaseRepository } from '@repositories/BaseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user', {
      id: { primary: true, },
      name: { },
      email: { },
      password: { returning: false, },
      fiscal_code: { },
      image_url: { },
      phone: { },
      city: { },
      state: { },
      address: { },
      neighborhood: { },
      microregion_id: { },
      postal_code: { },
      employer: { },
      about: { },
      created_at: { },
    });
  }
}
