import axios, { InternalAxiosRequestConfig } from "axios";
const request = axios.create({
  timeout: 10000,
  withCredentials: true,
});
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});
request.interceptors.response.use();
export default request;
