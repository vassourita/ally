import axios from 'axios';

import Auth from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: false,
});

api.interceptors.request.use(async req => {
  const token = Auth.getToken();
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
