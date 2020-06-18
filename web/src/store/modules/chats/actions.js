export const setChats = chats => {
  return {
    type: 'SET_CHATS',
    data: { chats },
  };
};

export const updateChat = (id, updated) => {
  return {
    type: 'UPDATE_CHAT',
    data: { id, updated },
  };
};

export const addChat = chat => {
  return {
    type: 'ADD_CHAT',
    data: { chat },
  };
};
