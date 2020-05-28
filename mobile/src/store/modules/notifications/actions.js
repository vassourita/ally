export const setNotifications = notifications => {
  return {
    type: 'SET_NOTIFICATIONS',
    data: { notifications },
  };
};

export const updateNotification = (id, updated) => {
  return {
    type: 'UPDATE_NOTIFICATION',
    data: { id, updated },
  };
};

export const addNotification = notification => {
  return {
    type: 'ADD_NOTIFICATION',
    data: { notification },
  };
};
