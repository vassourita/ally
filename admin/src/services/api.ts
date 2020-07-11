import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async req => {
  const storage = localStorage.getItem('@ally-admin/authorization');
  if (storage) {
    req.headers.authorization = `Bearer ${JSON.parse(storage).token}`;
  }
  return req;
});

export default api;
