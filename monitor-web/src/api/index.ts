import axios from 'axios';
import { REQUESTIP } from '@/constants';

axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export function generateHttpApi(method: 'get' | 'post') {
  return async (url: string, params?: any) => {
    const data = method === 'get' ? {
      params
    } : {
      data: params
    };
    url = REQUESTIP + url;
    try {
      const response = await axios({
        url,
        method,
        ...data,
      });
      return response.data;
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}

export const get = generateHttpApi('get');
export const post = generateHttpApi('post');
