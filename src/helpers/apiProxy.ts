import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);



axios.interceptors.response.use(
  (response) => {
    return response;
  }, (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const get = (endpoint: string) => {
    return axios.get(`${API_URL}/${endpoint}`)
      .then(
        (response) => {
            return response.data;
        },
        (error) => {
            console.log(error);
        }
      );
}

export const post = (endpoint: string, data: any) => {
    return axios.post(`${API_URL}/${endpoint}`, data)
      .then(
        (response) => {
            return response.data;
        }
      );
}

export const put = (endpoint: string, data: any) => {
    return axios.put(`${API_URL}/${endpoint}`, data)
      .then(
        (response) => {
            return response.data;
        }
      );
}

export const del = (endpoint: string) => {
    return axios.delete(`${API_URL}/${endpoint}`)
      .then(
        (response) => {
            return response.data;
        }
      );
}

