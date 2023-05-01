import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import appConfig from '../config/config.json';
import frontDataAdapter from './helper/frontDataAdapter';

const $host = axios.create({
  baseURL: appConfig.apiURL
});
const $productHost = axios.create({
  baseURL: appConfig.apiURL
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

$productHost.interceptors.response.use(productInterceptor);
$host.interceptors.request.use(authInterceptor);
$host.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.message === 'canceled') {
      throw error;
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true;
        const response = await axios.get(`${appConfig.apiURL}/user/refresh`, {
          withCredentials: true
        });
        localStorage.setItem('token', response.data.accessToken);
        return $host.request(originalRequest);
      } catch (e) {
        console.log(e);
        throw error;
      }
    }
    throw error;
  }
);

export { $host, $productHost };
