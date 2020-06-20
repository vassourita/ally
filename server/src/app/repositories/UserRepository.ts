import User from '@models/User';

import Repository from '@repositories/BaseRepository';

const UserRepository = new Repository<User>('user', {
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

export default UserRepository;
