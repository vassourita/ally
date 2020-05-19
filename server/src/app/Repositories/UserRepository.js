import Repository from '../Data/Repository';

const UserRepository = new Repository('user', {
  id: {
    primary: true,
  },
  name: {},
  email: {},
  password: {
    returning: false,
  },
  fiscal_code: {},
  image_url: {},
  phone: {},
  city: {},
  state: {},
  address: {},
  neighborhood: {},
  microregion_id: {},
  postal_code: {},
  employer: {},
  birth: {},
  about: {},
  created_at: {},
});

export default UserRepository;
