import { UserType } from '@models/UserType';

import { BaseRepository } from '@repositories/BaseRepository';

export class UserTypeRepository extends BaseRepository<UserType> {
  constructor() {
    super('user_type', {
      id: { primary: true },
      name: { },
    });
  }
}
