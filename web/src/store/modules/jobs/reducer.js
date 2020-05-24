const INITIAL_STATE = [];

function jobs(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'ADD_JOB': {
      localStorage.setItem(state.TOKEN_KEY, JSON.stringify({ token: data.token, id: data.id }));
      return [...state, data.job];
    }
    case 'REMOVE_JOB': {
      return state.filter(j => j.id !== data.id);
    }
    case 'UPDATE_JOBS': {
      const clone = [...state];
      const index = state.findIndex(j => j.id === data.id);
      clone[index] = {
        ...clone[index],
        ...data.updated,
      };
      return clone;
    }
    case 'SET_JOBS': {
      return data.jobs;
    }
    default: {
      return state;
    }
  }
}

export default jobs;
