const INITIAL_STATE = {
  id: 0,
  name: '',
  email: '',
  phone: 0,
  fiscal_code: 0,
  image_url: '',
  about: '',
  postal_code: 0,
  state: '',
  city: '',
  address: '',
  neighborhood: '',
  microregion_id: 0,
  created_at: '',
};

function user(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'SET_USER': {
      return data.user;
    }
    case 'UPDATE_USER': {
      return { ...state, ...data.updated };
    }
    case 'REMOVE_USER': {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
}

export default user;
