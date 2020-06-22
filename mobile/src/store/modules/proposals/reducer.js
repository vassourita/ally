const INITIAL_STATE = [];

function proposals(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'ADD_PROPOSAL': {
      localStorage.setItem(state.TOKEN_KEY, JSON.stringify({ token: data.token, id: data.id }));
      return [...state, data.proposal];
    }
    case 'REMOVE_PROPOSAL': {
      return state.filter(j => j.id !== data.id);
    }
    case 'UPDATE_PROPOSAL': {
      const clone = [...state];
      const index = state.findIndex(j => j.id === data.id);
      clone[index] = {
        ...clone[index],
        ...data.updated,
      };
      return clone;
    }
    case 'SET_PROPOSALS': {
      return data.proposals;
    }
    default: {
      return state;
    }
  }
}

export default proposals;
