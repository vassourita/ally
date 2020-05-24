export const login = (token, id) => {
  return {
    type: 'LOGIN',
    data: { token, id },
  };
};

export const logoff = () => {
  return {
    type: 'LOGOFF',
  };
};
