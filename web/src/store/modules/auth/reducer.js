const TOKEN_KEY = '@ally/authorization';

const storage = localStorage.getItem(TOKEN_KEY);

const INITIAL_STATE = {
  id: JSON.parse(storage)?.id,
  token: JSON.parse(storage)?.token,
  TOKEN_KEY,
};

function auth(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'LOGIN': {
      localStorage.setItem(state.TOKEN_KEY, JSON.stringify({ token: data.token, id: data.id }));
      return {
        ...state,
        id: data.id,
        token: data.token,
      };
    }
    case 'LOGOFF': {
      localStorage.removeItem(state.TOKEN_KEY);
      return {
        id: null,
        token: null,
        TOKEN_KEY,
      };
    }
    default: {
      return state;
    }
  }
}

export default auth;
