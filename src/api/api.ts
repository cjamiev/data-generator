import axios from 'axios';

const api = {
  get: (url: string) => {
    return axios.get(url);
  },
  post: (url: string, payload: string) => {
    return axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  delete: (url: string) => {
    return axios.delete(url);
  }
};

export default api;
