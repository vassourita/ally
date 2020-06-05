import Repository from '../data/Repository';

const UserRepository = new Repository('user', {
  id: {
    type: Number(),
    primary: true,
  },
  name: {
    type: String(),
  },
  email: {
    type: String(),
  },
  password: {
    type: String(),
    returning: false,
  },
  fiscal_code: {
    type: String(),
  },
  image_url: {
    type: String(),
  },
  phone: {
    type: String(),
  },
  city: {
    type: String(),
  },
  state: {
    type: String(),
  },
  address: {
    type: String(),
  },
  neighborhood: {
    type: String(),
  },
  microregion_id: {
    type: Number(),
  },
  postal_code: {
    type: String(),
  },
  employer: {
    type: Boolean(),
  },
  about: {
    type: String(),
  },
  created_at: {
    type: String(),
  },
});

export default UserRepository;
