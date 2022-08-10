import axios from 'axios';
import { REQUESTIP } from '../common/const';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {

    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

    return response;
}, function (error) {

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


// import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
// import {interfaceError} from "@/utils/catchError";
//
// const service = axios.create(); // Request interceptors
//
// service.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         // do something
//         return config;
//     },
//     (error: any) => {
//         Promise.reject(error);
//     }
// ); // Response interceptors
//
// service.interceptors.response.use(
//     async (response: AxiosResponse) => {
//         return response.data;
//     },
//     (error: any) => {
//         // 接口有响应，但是返回错误
//         if (error.response) {
//             // 有响应，首先获取状态码，根据状态码来判断什么时候需要收集异常
//             let response = error.response;
//             if (response.status >= 400) {
//                 interfaceError(response);
//             }
//         }
//         // 接口没响应，请求一直挂起，多数是接口崩溃了
//         else {
//             interfaceError(null);
//         }
//         return Promise.reject(error);
//     }
// );
//
// export default service;