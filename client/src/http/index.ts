import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import config from '../config/config.json';
import frontDataAdapter from './helper/frontDataAdapter';

const $host = axios.create({
  baseURL: config.apiURL
});
const $productHost = axios.create({
  baseURL: config.apiURL
});

const $authHost = axios.create({
  baseURL: config.apiURL
});

const productInterceptor = (response: AxiosResponse) => {
  if (response.data?.rows) {
    response.data.rows = frontDataAdapter(response.data.rows);
    return response;
  }
  response.data = frontDataAdapter([response.data].flat());
  return response;
};

const authInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
};

$authHost.interceptors.request.use(authInterceptor);
$productHost.interceptors.response.use(productInterceptor);

export { $authHost, $host, $productHost };
