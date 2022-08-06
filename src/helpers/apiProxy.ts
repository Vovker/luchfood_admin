import axios from 'axios';

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
    if(response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return response;
  }
);

export const get = (endpoint: string) => {
    return axios.get(endpoint)
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
    return axios.post(endpoint, data)
      .then(
        (response) => {
            return response.data;
        }
      );
}

export const put = (endpoint: string, data: any) => {
    return axios.put(endpoint, data)
      .then(
        (response) => {
            return response.data;
        }
      );
}

export const del = (endpoint: string) => {
    return axios.delete(endpoint)
      .then(
        (response) => {
            return response.data;
        }
      );
}

