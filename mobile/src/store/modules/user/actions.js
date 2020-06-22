export const setUser = user => {
  return {
    type: 'SET_USER',
    data: { user },
  };
};

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  };
};

export const updateUser = updated => {
  return {
    type: 'UPDATE_USER',
    data: { updated },
  };
};

export const addKnowledge = knowledge => {
  return {
    type: 'ADD_KNOWLEDGE',
    data: { knowledge },
  };
};

export const removeKnowledge = id => {
  return {
    type: 'REMOVE_KNOWLEDGE',
    data: { id },
  };
};
