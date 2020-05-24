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

export const updateUser = about => {
  return {
    type: 'UPDATE_USER',
    data: { updated: about },
  };
};
