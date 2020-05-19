export const TOKEN_KEY = '@ally-authorization';

export const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY);

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY)).token;

export const getUserId = () => JSON.parse(localStorage.getItem(TOKEN_KEY)).id;

export const login = (token, id) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, id }));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
