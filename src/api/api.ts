import axios from 'axios';

const api = {
  get: (url: string) => {
    return axios.get(url);
  },
  post: (url: string, payload: unknown) => {
    return axios.post(url, payload);
  }
};

export default api;
