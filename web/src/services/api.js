import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Client: 'web',
    Authorization: sessionStorage.getItem('ally_authorization'),
  },
});

export default api;
