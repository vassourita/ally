const INITIAL_STATE = [];

function chats(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'ADD_CHAT': {
      return [data.chat, ...state];
    }
    case 'UPDATE_CHAT': {
      const clone = [...state];
      const index = state.findIndex(j => j.id === data.id);
      clone[index] = {
        ...clone[index],
        ...data.updated,
      };
      return clone;
    }
    case 'SET_CHATS': {
      return data.chats;
    }
    default: {
      return state;
    }
  }
}

export default chats;
