const INITIAL_STATE = [];

function notifications(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'ADD_NOTIFICATION': {
      return [data.notification, ...state];
    }
    case 'UPDATE_NOTIFICATION': {
      const clone = [...state];
      const index = state.findIndex(j => j.id === data.id);
      clone[index] = {
        ...clone[index],
        ...data.updated,
      };
      return clone;
    }
    case 'SET_NOTIFICATIONS': {
      return data.notifications;
    }
    default: {
      return state;
    }
  }
}

export default notifications;
