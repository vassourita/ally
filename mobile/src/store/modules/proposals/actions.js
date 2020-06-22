export const setProposals = proposals => {
  return {
    type: 'SET_PROPOSALS',
    data: { proposals },
  };
};

export const updateProposal = (id, updated) => {
  return {
    type: 'UPDATE_PROPOSAL',
    data: { id, updated },
  };
};

export const removeProposal = id => {
  return {
    type: 'REMOVE_PROPOSAL',
    data: { id },
  };
};

export const addProposal = proposal => {
  return {
    type: 'ADD_PROPOSAL',
    data: { proposal },
  };
};
