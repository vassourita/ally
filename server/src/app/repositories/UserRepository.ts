import User from '@models/User';

import Repository from '@repositories/BaseRepository';

const UserRepository = new Repository<User>('user', {
  id: { primary: true, },
  password: { returning: false, },
});

export default UserRepository;
