import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: false,
});

api.interceptors.request.use(async req => {
  const storage = localStorage.getItem('@ally/authorization');
  if (storage) {
    req.headers.authorization = `Bearer ${JSON.parse(storage).token}`;
  }
  return req;
});

export default api;
