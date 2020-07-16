import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async req => {
  req.headers.authorization = `Bearer ${process.env.REACT_APP_AUTHORIZATION}`;
  
  return req;
});

export default api;
