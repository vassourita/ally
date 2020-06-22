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
    case 'UPDATE_JOB': {
      const clone = [...state];
      const index = state.findIndex(j => j.id === data.id);
      clone[index] = {
        ...clone[index],
        ...data.updated,
      };
      return clone;
    }
    case 'REMOVE_JOB_PROPOSAL': {
      const clone = [...state];
      clone[data.index] = {
        ...clone[data.index],
        proposals: clone[data.index].proposals.filter(p => p.id !== data.id),
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
